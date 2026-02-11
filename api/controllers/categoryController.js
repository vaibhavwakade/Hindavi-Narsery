const Category = require('../models/Category');
const Product = require('../models/Product');

exports.createCategory = async (req, res, next) => {
  try {
    const { name, description, type } = req.body;

    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
      const error = new Error('Category name already exists');
      error.status = 400;
      throw error;
    }

    const category = await Category.create({ name, description, type });

    res.status(201).json({ message: 'Category created', category });
  } catch (error) {
    next(error);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.json(categories || []);
  } catch (error) {
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      const error = new Error('Category not found');
      error.status = 404;
      throw error;
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};
exports.updateCategory = async (req, res, next) => {
  try {
    const { name, description, type } = req.body;

    const category = await Category.findByPk(req.params.id);
    if (!category) {
      const error = new Error('Category not found');
      error.status = 404;
      throw error;
    }

    if (name && name !== category.name) {
      const existingCategory = await Category.findOne({ where: { name } });
      if (existingCategory) {
        const error = new Error('Category name already exists');
        error.status = 400;
        throw error;
      }
    }

    if (name) category.name = name;
    if (description) category.description = description;
    if (type) category.type = type;

    await category.save();
    res.json({ message: 'Category updated', category });
  } catch (error) {
    next(error);
  }
};


exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      const error = new Error('Category not found');
      error.status = 404;
      throw error;
    }

    const productsCount = await Product.count({ where: { categoryId: req.params.id } });
    if (productsCount > 0) {
      const error = new Error('Cannot delete category with associated products');
      error.status = 400;
      throw error;
    }

    await category.destroy();
    res.json({ message: 'Category deleted' });
  } catch (error) {
    next(error);
  }
};
