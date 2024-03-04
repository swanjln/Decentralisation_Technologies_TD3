import express, { Request, Response } from 'express';
import Order from '../models/Order';
import OrdersItem from "../models/OrdersItem";
import Product from '../models/Product';
import Cart from "../models/Cart";
import CartItem from "../models/CartItem";
import cartRoutes from "./CartRoutes";

const orderRoutes = express.Router();

// POST /orders
orderRoutes.post('/orders', async (req: Request, res: Response) => {
    try {
        const { products, userId } = req.body;

        // Calculate total price
        let totalPrice = 0;
        for (const { productId, quantity } of products) {
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${productId} not found` });
            }
            totalPrice += product.price * quantity;
        }

        // Create order
        const order = await Order.create({ userId, totalPrice });

        // Create order items
        for (const { productId, quantity } of products) {
            await OrdersItem.create({ orderId: order.orderId, productId, quantity });
        }

        res.status(201).json(order);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
});


orderRoutes.get('/orders/:userId', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);

        // Find all orders associated with the user's userId
        const orders = await Order.findAll({
            include: [{
                model: Cart,
                where: { userId }
            }]
        });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for the user" });
        }

        // Fetch product details for each order item
        const allOrdersWithProductDetails = await Promise.all(orders.map(async (order) => {
            // Get cart items for the order
            const orderItems = await OrdersItem.findAll({
                where: { orderId: order.orderId }
            });

            // Fetch product details for each order item
            const orderItemsWithProductDetails = await Promise.all(orderItems.map(async (orderItem) => {
                const product = await Product.findByPk(orderItem.productId);
                return {
                    productId: orderItem.productId,
                    quantity: orderItem.quantity,
                    price: orderItem.price,
                    product: product || {} // If product not found, return an empty object
                };
            }));

            // Calculate total price for the order
            let totalPrice = 0;
            orderItems.forEach(orderItem => {
                totalPrice += orderItem.quantity * orderItem.price;
            });

            return {
                orderId: order.orderId,
                orderDate: order.orderDate,
                items: orderItemsWithProductDetails,
                totalPrice: totalPrice
            };
        }));

        res.json(allOrdersWithProductDetails);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
});



export default orderRoutes;
