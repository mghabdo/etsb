module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'products',
      [
        {
          name: 'Product 1',
          description: 'Description Product 1',
          category_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Product 2',
          description: 'Description Product 2',
          category_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Product 3',
          description: 'Description Product 3',
          category_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  },
};
