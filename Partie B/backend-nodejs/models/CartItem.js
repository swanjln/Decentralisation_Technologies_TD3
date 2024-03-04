"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../database/sequelize"));
const Cart_1 = __importDefault(require("./Cart"));
const Product_1 = __importDefault(require("./Product"));
class CartItem extends sequelize_1.Model {
}
CartItem.init({
    cartId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: 'CartItem',
    modelName: 'CartItem',
    timestamps: false,
});
CartItem.belongsTo(Cart_1.default, { foreignKey: 'cartId' }); // Assuming there's a one-to-many relationship between Cart and CartItem
CartItem.belongsTo(Product_1.default, { foreignKey: 'productId' }); // Assuming there's a one-to-many relationship between Product and CartItem
exports.default = CartItem;
