"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../database/sequelize"));
class Product extends sequelize_1.Model {
}
Product.init({
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    productName: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    stock: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: 'Product',
    modelName: 'Product',
    timestamps: false,
});
exports.default = Product;
