import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Product } from '@interfaces/products.interface';

export type ProductCreationAttributes = Optional<Product, 'id' | 'name' | 'description'>;

export class ProductModel extends Model<Product, ProductCreationAttributes> implements Product {
  public id: string;
  public name: string;
  public description: string;
}

export default function (sequelize: Sequelize): typeof ProductModel {
  ProductModel.init(
    {
      id: {
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      description: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'products',
      sequelize,
      timestamps: true,
    },
  );

  return ProductModel;
}
