'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          name: 'Category 1',
          description: 'Description Category 1',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Category 2',
          description: 'Description Category 2',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Category 3',
          description: 'Description Category 3',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
