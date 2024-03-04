import { DataTypes, Model } from "sequelize";
import sequelize from '../database/sequelize';
import User from './User';
import CartItem from './CartItem';

class Cart extends Model {
    public cartId!: number;
    public userId!: number;
}

Cart.init(
    {
        cartId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'Cart',
        modelName: 'Cart',
        timestamps: false,
    }
);

// Cart.belongsTo(User, { foreignKey: 'userId' }); // Assuming there's a one-to-many relationship between User and Cart
// Cart.hasMany(CartItem, { foreignKey: 'cartId' }); // Assuming there's a one-to-many relationship between Cart and CartItem

export default Cart;
