"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../database/sequelize"));
class Cart extends sequelize_1.Model {
}
Cart.init({
    cartId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: 'Cart',
    modelName: 'Cart',
    timestamps: false,
});
// Cart.belongsTo(User, { foreignKey: 'userId' }); // Assuming there's a one-to-many relationship between User and Cart
// Cart.hasMany(CartItem, { foreignKey: 'cartId' }); // Assuming there's a one-to-many relationship between Cart and CartItem
exports.default = Cart;
