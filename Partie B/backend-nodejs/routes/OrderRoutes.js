"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Order_1 = __importDefault(require("../models/Order"));
const OrdersItem_1 = __importDefault(require("../models/OrdersItem"));
const Product_1 = __importDefault(require("../models/Product"));
const Cart_1 = __importDefault(require("../models/Cart"));
const orderRoutes = express_1.default.Router();
// POST /orders
orderRoutes.post('/orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products, userId } = req.body;
        // Calculate total price
        let totalPrice = 0;
        for (const { productId, quantity } of products) {
            const product = yield Product_1.default.findByPk(productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${productId} not found` });
            }
            totalPrice += product.price * quantity;
        }
        // Create order
        const order = yield Order_1.default.create({ userId, totalPrice });
        // Create order items
        for (const { productId, quantity } of products) {
            yield OrdersItem_1.default.create({ orderId: order.orderId, productId, quantity });
        }
        res.status(201).json(order);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
}));
orderRoutes.get('/orders/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        // Find all orders associated with the user's userId
        const orders = yield Order_1.default.findAll({
            include: [{
                    model: Cart_1.default,
                    where: { userId }
                }]
        });
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for the user" });
        }
        // Fetch product details for each order item
        const allOrdersWithProductDetails = yield Promise.all(orders.map((order) => __awaiter(void 0, void 0, void 0, function* () {
            // Get cart items for the order
            const orderItems = yield OrdersItem_1.default.findAll({
                where: { orderId: order.orderId }
            });
            // Fetch product details for each order item
            const orderItemsWithProductDetails = yield Promise.all(orderItems.map((orderItem) => __awaiter(void 0, void 0, void 0, function* () {
                const product = yield Product_1.default.findByPk(orderItem.productId);
                return {
                    productId: orderItem.productId,
                    quantity: orderItem.quantity,
                    price: orderItem.price,
                    product: product || {} // If product not found, return an empty object
                };
            })));
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
        })));
        res.json(allOrdersWithProductDetails);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
}));
exports.default = orderRoutes;
