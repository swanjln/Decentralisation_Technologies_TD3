import {DataTypes, Model} from "sequelize";
import sequelize from '../database/sequelize';
class Product extends Model {
    public productId!: number;
    public productName!: string;
    public description!: string;
    public price!: number;
    public category!: string;
    public stock!: number;
}

Product.init(
    {
        productId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        productName: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        category : {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        stock: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'Product',
        modelName: 'Product',
        timestamps: false,
    }
);


export default Product;