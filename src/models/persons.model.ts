import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Person } from '@interfaces/persons.interface';

export type PersonCreationAttributes = Optional<Person, 'id' | 'firstName' | 'lastName' | 'email'>;

export class PersonModel extends Model<Person, PersonCreationAttributes> implements Person {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof PersonModel {
  PersonModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      lastName: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'persons',
      sequelize,
    },
  );

  return PersonModel;
}
