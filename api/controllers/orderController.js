const { Order, OrderItem } = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const sequelize = require('../config/database');

exports.createOrder = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { items } = req.body;
    const userId = req.user.userId;

    if (!items || !Array.isArray(items) || items.length === 0) {
      await t.rollback();
      return res.status(400).json({ message: 'Items are required' });
    }

    let totalAmount = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await Product.findByPk(item.productId, { transaction: t });
      if (!product) {
        await t.rollback();
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }
      if (item.quantity > product.stock) {
        await t.rollback();
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }
      const itemTotal = parseFloat(product.price) * item.quantity;
      totalAmount += itemTotal;

      orderItemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });

      // Update stock
      product.stock -= item.quantity;
      await product.save({ transaction: t });
    }

    const order = await Order.create({
      userId,
      totalAmount,
      status: 'pending',
      paymentStatus: 'unpaid',
    }, { transaction: t });

    for (const itemData of orderItemsData) {
      await OrderItem.create({
        orderId: order.id,
        ...itemData
      }, { transaction: t });
    }

    await t.commit();

    // Fetch created order with items
    const createdOrder = await Order.findByPk(order.id, {
      include: [{ model: OrderItem, as: 'items', include: [{ model: Product, as: 'productDetails' }] }]
    });

    res.status(201).json({ message: 'Order created successfully', order: createdOrder });
  } catch (error) {
    await t.rollback();
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await Order.findAll({
      where: { userId },
      include: [{
        model: OrderItem,
        as: 'items',
        include: [{ model: Product, as: 'productDetails' }]
      }],
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const order = await Order.findOne({
      where: { id, userId },
      include: [{
        model: OrderItem,
        as: 'items',
        include: [{ model: Product, as: 'productDetails' }]
      }]
    });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Failed to fetch order' });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const order = await Order.findOne({ where: { id, userId } });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (order.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending orders can be cancelled' });
    }
    order.status = 'cancelled';
    await order.save();
    res.status(200).json({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ message: 'Failed to cancel order' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (!['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    order.status = status;
    await order.save();

    const newOrder = await Order.findByPk(id, {
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'productDetails' }]
        },
        { model: User, as: 'userDetails', attributes: ['name', 'email'] }
      ]
    });

    res.status(200).json({ order: newOrder, message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Failed to update order status' });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const order = await Order.findOne({ where: { id, userId } });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (order.paymentStatus === 'paid') {
      return res.status(400).json({ message: 'Order is already paid' });
    }
    order.paymentStatus = 'paid';
    order.status = 'confirmed';
    await order.save();
    res.status(200).json({ message: 'Payment status updated successfully' });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ message: 'Failed to update payment status' });
  }
};