"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../database/sequelize"));
const Cart_1 = __importDefault(require("./Cart"));
class Order extends sequelize_1.Model {
}
Order.init({
    orderId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cartId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    orderDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    }
}, {
    sequelize: sequelize_2.default,
    tableName: 'Orders',
    modelName: 'Orders',
    timestamps: false,
});
Order.belongsTo(Cart_1.default, { foreignKey: 'cartId' }); // Assuming there's a one-to-many relationship between Cart and Order
exports.default = Order;
