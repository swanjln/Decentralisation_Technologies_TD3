import { DataTypes, Model } from "sequelize";
import sequelize from '../database/sequelize';
import Cart from './Cart';
import Order from "./Order";

class User extends Model {
    public userId!: number;
    public username!: string;
    public password!: string;
    public email!: string;
}

User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'User',
        modelName: 'User',
        timestamps: false,
    }
);

User.hasOne(Cart, { foreignKey: 'userId' , onDelete: 'CASCADE'}); // Assuming there's a one-to-one relationship between User and Cart
User.hasMany(Order, { foreignKey: 'userId' , onDelete: 'CASCADE'}); // Assuming there's a one-to-many relationship between User and Order
export default User;
