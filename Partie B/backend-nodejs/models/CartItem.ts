import { DataTypes, Model } from "sequelize";
import sequelize from '../database/sequelize';
import Cart from './Cart';
import Product from './Product';

class CartItem extends Model {
    public cartId!: number;
    public productId!: number;
    public quantity!: number;
    public price!: number;
}

CartItem.init(
    {
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'CartItem',
        modelName: 'CartItem',
        timestamps: false,
    }
);

CartItem.belongsTo(Cart, { foreignKey: 'cartId' }); // Assuming there's a one-to-many relationship between Cart and CartItem
CartItem.belongsTo(Product, { foreignKey: 'productId' }); // Assuming there's a one-to-many relationship between Product and CartItem

export default CartItem;
