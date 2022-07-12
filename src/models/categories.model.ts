import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Category } from '@interfaces/categories.interface';

export type CategoryCreationAttributes = Optional<Category, 'id' | 'name' | 'description'>;

export class CategoryModel extends Model<Category, CategoryCreationAttributes> implements Category {
  public id: string;
  public name: string;
  public description: string;
}

export default function (sequelize: Sequelize): typeof CategoryModel {
  CategoryModel.init(
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
      tableName: 'categories',
      sequelize,
      timestamps: true,
    },
  );

  return CategoryModel;
}
