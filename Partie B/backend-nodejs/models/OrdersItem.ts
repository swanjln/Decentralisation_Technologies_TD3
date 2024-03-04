import { DataTypes, Model } from "sequelize";
import sequelize from '../database/sequelize';
import Order from './Order';
import Product from './Product';

class OrdersItem extends Model {
    public orderId!: number;
    public productId!: number;
    public quantity!: number;
    public price!: number;
}

OrdersItem.init(
    {
        orderId: {
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
        tableName: 'OrdersItem',
        modelName: 'OrdersItem',
        timestamps: false,
    }
);

OrdersItem.belongsTo(Order, { foreignKey: 'orderId' }); // Assuming there's a one-to-many relationship between Cart and CartItem
OrdersItem.belongsTo(Product, { foreignKey: 'productId' }); // Assuming there's a one-to-many relationship between Product and CartItem

export default OrdersItem;
