'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          name: 'Category 1',
          description: 'Description Category 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Category 2',
          description: 'Description Category 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Category 3',
          description: 'Description Category 3',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
