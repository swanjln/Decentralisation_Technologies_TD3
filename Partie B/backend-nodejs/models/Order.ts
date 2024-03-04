import { DataTypes, Model } from "sequelize";
import sequelize from '../database/sequelize';
import Cart from './Cart';

class Order extends Model {
    public orderId!: number;
    public cartId!: number;
    public orderDate!: Date;
}

Order.init(
    {
        orderId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        sequelize,
        tableName: 'Orders',
        modelName: 'Orders',
        timestamps: false,
    }
);

Order.belongsTo(Cart, { foreignKey: 'cartId' }); // Assuming there's a one-to-many relationship between Cart and Order

export default Order;
