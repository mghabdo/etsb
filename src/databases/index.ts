import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';
import UserModel from '@models/users.model';
import ProductModel from '@models/products.model';
import PersonModel from '@models/persons.model';
import CategoryModel from '@models/categories.model';
import { logger } from '@utils/logger';
const pg = require('pg');
const sequelize = new Sequelize.Sequelize('postgres://postgres:postgres@127.0.0.1:5432/etsb', {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('_____connecting ....');
  })
  .catch(err => {
    console.log('____ERROR', err);
  });

const DB = {
  Users: UserModel(sequelize),
  Products: ProductModel(sequelize),
  Persons: PersonModel(sequelize),
  Categories: CategoryModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

DB.Products.belongsTo(DB.Categories, { foreignKey: 'category_id' });
DB.Categories.hasMany(DB.Products, { foreignKey: 'category_id' });

export default DB;
