const { Cart, CartItem } = require('../models/Cart');
const Product = require('../models/Product');

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;

    const product = await Product.findByPk(productId);
    if (!product) {
      const error = new Error('Product not found');
      error.status = 404;
      throw error;
    }
    if (product.stock < quantity) {
      const error = new Error('Insufficient stock');
      error.status = 400;
      throw error;
    }

    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
      // cart created
    }

    const existingItem = await CartItem.findOne({
      where: { cartId: cart.id, productId }
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      if (existingItem.quantity > product.stock) {
        const error = new Error('Requested quantity exceeds stock');
        error.status = 400;
        throw error;
      }
      await existingItem.save();
    } else {
      await CartItem.create({
        cartId: cart.id,
        productId,
        quantity
      });
    }

    const populatedCart = await Cart.findByPk(cart.id, {
      include: [{
        model: CartItem,
        include: [{ model: Product }]
      }]
    });

    res.json({ message: 'Item added to cart', cart: populatedCart });
  } catch (error) {
    next(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.userId },
      include: [{
        model: CartItem,
        include: [{ model: Product }]
      }]
    });

    if (!cart) return res.json({ items: [] });

    // In Sequelize, associations result in nested objects. 
    // Mongoose populated: items: [{ product: {...}, quantity: 1 }]
    // Sequelize include: CartItems: [{ Product: {...}, quantity: 1, ... }]
    // We need to map it to match frontend expectation if possible, or frontend needs update.
    // Frontend expects: cart.items array where item has .product and .quantity.
    // My model def: Cart.hasMany(CartItem).
    // So cart.CartItems is the array.
    // Frontend likely uses cart.items.
    // Let's transform the response or alias the association.
    // I didn't alias it in model def (default is CartItems).
    // The previous code in `api/models/Cart.js` had `Cart.hasMany(CartItem, { foreignKey: 'cartId' });`
    // I should alias it to 'items' to match Mongoose structure expectation if possible.
    // Or transform here.

    const plainCart = cart.get({ plain: true });
    // Transform CartItems to items
    if (plainCart.CartItems) {
      plainCart.items = plainCart.CartItems.map(item => ({
        ...item,
        product: item.Product
      }));
      delete plainCart.CartItems;
    } else {
      plainCart.items = [];
    }

    const total = plainCart.items.reduce((sum, item) => sum + item.quantity * (item.product ? item.product.price : 0), 0);
    res.json({ cart: plainCart, total });
  } catch (error) {
    next(error);
  }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;

    const product = await Product.findByPk(productId);
    if (!product) {
      const error = new Error('Product not found');
      error.status = 404;
      throw error;
    }
    if (quantity > product.stock) {
      const error = new Error('Requested quantity exceeds stock');
      error.status = 400;
      throw error;
    }

    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      const error = new Error('Cart not found');
      error.status = 404;
      throw error;
    }

    const item = await CartItem.findOne({
      where: { cartId: cart.id, productId }
    });

    if (!item) {
      const error = new Error('Item not in cart');
      error.status = 404;
      throw error;
    }

    if (quantity === 0) {
      await item.destroy();
    } else {
      item.quantity = quantity;
      await item.save();
    }

    // Return updated cart
    // Re-use logic or helper?
    const updatedCart = await Cart.findByPk(cart.id, {
      include: [{
        model: CartItem,
        include: [{ model: Product }]
      }]
    });

    const plainCart = updatedCart.get({ plain: true });
    if (plainCart.CartItems) {
      plainCart.items = plainCart.CartItems.map(i => ({
        ...i,
        product: i.Product
      }));
      delete plainCart.CartItems;
    } else {
      plainCart.items = [];
    }

    const total = plainCart.items.reduce((sum, item) => sum + item.quantity * (item.product ? item.product.price : 0), 0);
    res.json({ message: 'Cart updated', cart: plainCart, total });
  } catch (error) {
    next(error);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const userId = req.user.userId;

    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      const error = new Error('Cart not found');
      error.status = 404;
      throw error;
    }

    const itemToDelete = await CartItem.findOne({
      where: { cartId: cart.id, productId }
    });

    if (!itemToDelete) {
      const error = new Error('Item not in cart');
      error.status = 404;
      throw error;
    }

    await itemToDelete.destroy();

    // Return updated
    const updatedCart = await Cart.findByPk(cart.id, {
      include: [{
        model: CartItem,
        include: [{ model: Product }]
      }]
    });

    const plainCart = updatedCart.get({ plain: true });
    if (plainCart.CartItems) {
      plainCart.items = plainCart.CartItems.map(i => ({
        ...i,
        product: i.Product
      }));
      delete plainCart.CartItems;
    } else {
      plainCart.items = [];
    }

    const total = plainCart.items.reduce((sum, item) => sum + item.quantity * (item.product ? item.product.price : 0), 0);
    res.json({ message: 'Item removed from cart', cart: plainCart, total });
  } catch (error) {
    next(error);
  }
};

exports.clearCart = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      const error = new Error('Cart not found');
      error.status = 404;
      throw error;
    }

    await CartItem.destroy({ where: { cartId: cart.id } });

    res.json({ message: 'Cart cleared', cart: { items: [] } });
  } catch (error) {
    next(error);
  }
};
