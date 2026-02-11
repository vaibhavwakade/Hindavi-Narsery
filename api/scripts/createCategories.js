const sequelize = require('../config/database');
const Category = require('../models/Category');

async function createCategories() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    await sequelize.sync();
    
    const categories = [
      { name: 'Indoor Plants', description: 'Plants suitable for indoor environments', type: 'Plants' },
      { name: 'Outdoor Plants', description: 'Plants for outdoor gardens', type: 'Plants' },
      { name: 'Flowers', description: 'Beautiful flowering plants', type: 'Flowers' },
      { name: 'Pots', description: 'Various types of plant pots', type: 'Pots' },
      { name: 'Garden Tools', description: 'Tools for gardening', type: 'Utensils' },
      { name: 'Seeds', description: 'Plant seeds for growing', type: 'Others' }
    ];

    for (const categoryData of categories) {
      const existingCategory = await Category.findOne({ where: { name: categoryData.name } });
      if (!existingCategory) {
        const category = await Category.create(categoryData);
        console.log('Created category:', category.name, 'with ID:', category.id);
      } else {
        console.log('Category already exists:', categoryData.name, 'with ID:', existingCategory.id);
      }
    }
    
  } catch (error) {
    console.error('Error creating categories:', error);
  } finally {
    await sequelize.close();
  }
}

createCategories();