const Product = require('../models/Product');
const Category = require('../models/Category');
const cloudinary = require('cloudinary').v2;
const { Op } = require('sequelize');

exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock, size } = req.body;
    const categoryExists = await Category.findByPk(category);
    if (!categoryExists) {
      const error = new Error('Category not found');
      error.status = 404;
      throw error;
    }

    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file =>
        new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) reject(new Error('Cloudinary upload failed'));
            resolve(result.secure_url);
          }).end(file.buffer);
        })
      );
      imageUrls = await Promise.all(uploadPromises);
    }

    const product = await Product.create({
      name,
      description,
      price,
      categoryId: category, // Sequelize uses categoryId defaults
      imageUrls,
      stock,
      size
    });

    res.status(201).json({ message: 'Product created', product });
  } catch (error) {
    next(error);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    const whereClause = {};

    if (category) whereClause.categoryId = category;
    if (search) whereClause.name = { [Op.like]: `%${search}%` }; // MySQL LIKE

    const offset = (page - 1) * limit;

    const { count, rows: products } = await Product.findAndCountAll({
      where: whereClause,
      include: [{ model: Category, as: 'categoryDetails' }],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    // Ensure imageUrls is properly parsed as array
    const processedProducts = products.map(product => ({
      ...product.toJSON(),
      imageUrls: Array.isArray(product.imageUrls) 
        ? product.imageUrls 
        : product.imageUrls 
        ? (typeof product.imageUrls === 'string' 
          ? JSON.parse(product.imageUrls) 
          : [product.imageUrls])
        : []
    }));

    res.json({ products: processedProducts, total: count, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: 'categoryDetails' }]
    });
    if (!product) {
      const error = new Error('Product not found');
      error.status = 404;
      throw error;
    }

    // Ensure imageUrls is properly parsed as array
    const processedProduct = {
      ...product.toJSON(),
      imageUrls: Array.isArray(product.imageUrls) 
        ? product.imageUrls 
        : product.imageUrls 
        ? (typeof product.imageUrls === 'string' 
          ? JSON.parse(product.imageUrls) 
          : [product.imageUrls])
        : []
    };

    res.json(processedProduct);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock, size } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      const error = new Error('Product not found');
      error.status = 404;
      throw error;
    }

    if (category) {
      const categoryExists = await Category.findByPk(category);
      if (!categoryExists) {
        const error = new Error('Category not found');
        error.status = 404;
        throw error;
      }
    }

    let imageUrls = product.imageUrls;
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file =>
        new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) reject(new Error('Cloudinary upload failed'));
            resolve(result.secure_url);
          }).end(file.buffer);
        })
      );
      imageUrls = await Promise.all(uploadPromises);
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.categoryId = category;
    if (imageUrls) product.imageUrls = imageUrls;
    if (stock !== undefined) product.stock = stock;
    if (size) product.size = size;

    await product.save();
    res.json({ message: 'Product updated', product });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      const error = new Error('Product not found');
      error.status = 404;
      throw error;
    }
    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
};
