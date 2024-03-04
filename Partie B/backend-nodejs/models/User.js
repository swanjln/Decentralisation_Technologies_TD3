"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../database/sequelize"));
const Cart_1 = __importDefault(require("./Cart"));
const Order_1 = __importDefault(require("./Order"));
class User extends sequelize_1.Model {
}
User.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize: sequelize_2.default,
    tableName: 'User',
    modelName: 'User',
    timestamps: false,
});
User.hasOne(Cart_1.default, { foreignKey: 'userId', onDelete: 'CASCADE' }); // Assuming there's a one-to-one relationship between User and Cart
User.hasMany(Order_1.default, { foreignKey: 'userId', onDelete: 'CASCADE' }); // Assuming there's a one-to-many relationship between User and Order
exports.default = User;
