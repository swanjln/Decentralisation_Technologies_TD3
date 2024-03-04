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
const Cart_1 = __importDefault(require("../models/Cart"));
const CartItem_1 = __importDefault(require("../models/CartItem"));
const Product_1 = __importDefault(require("../models/Product"));
const cartRoutes = express_1.default.Router();
// POST /cart/:userId
cartRoutes.post('/cart/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, quantity } = req.body;
        const userId = parseInt(req.params.userId);
        // Check if the product exists
        const product = yield Product_1.default.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: `Product with ID ${productId} not found` });
        }
        // Find or create the user's cart
        let cart = yield Cart_1.default.findOne({
            where: { userId }
        });
        if (!cart) {
            cart = yield Cart_1.default.create({ userId });
        }
        // Add product to cart
        const cartItem = yield CartItem_1.default.create({
            cartId: cart.cartId,
            productId,
            quantity,
            price: product.price // Assuming the price is fetched from the product
        });
        res.status(201).json(cartItem);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
}));
// GET /cart/:userId
cartRoutes.get('/cart/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        // Find the user's cart
        const cart = yield Cart_1.default.findOne({
            where: { userId }
        });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found for the user" });
        }
        // Find the orderId associated with the user's cart
        const cartId = cart.cartId;
        // Get cart items for the order
        const cartItems = yield CartItem_1.default.findAll({
            where: { cartId }
        });
        // Fetch product details for each cart item
        const cartItemsWithProductDetails = yield Promise.all(cartItems.map((cartItem) => __awaiter(void 0, void 0, void 0, function* () {
            const product = yield Product_1.default.findByPk(cartItem.productId);
            return {
                productId: cartItem.productId,
                quantity: cartItem.quantity,
                price: cartItem.price,
                product: product || {} // If product not found, return an empty object
            };
        })));
        // Calculate total price
        let totalPrice = 0;
        cartItems.forEach(cartItem => {
            totalPrice += cartItem.quantity * cartItem.price;
        });
        res.json({ cartItems: cartItemsWithProductDetails, totalPrice });
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
}));
// DELETE /cart/:userId/item/:productId
cartRoutes.delete('/cart/:userId/item/:productId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const productId = parseInt(req.params.productId);
        // Find the cart associated with the userId
        const cart = yield Cart_1.default.findOne({ where: { userId } });
        if (!cart) {
            return res.status(404).json({ message: `Cart not found for the user with ID ${userId}` });
        }
        // Find and delete the cart item
        const cartItem = yield CartItem_1.default.findOne({ where: { cartId: cart.cartId, productId } });
        if (!cartItem) {
            return res.status(404).json({ message: `Product with ID ${productId} not found in the cart` });
        }
        yield cartItem.destroy();
        res.json({ message: 'Product removed from cart' });
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
}));
exports.default = cartRoutes;
