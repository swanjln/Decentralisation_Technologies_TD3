import express, { Request, Response } from 'express';
import Cart from "../models/Cart";
import CartItem from '../models/CartItem';
import Product from '../models/Product';

const cartRoutes = express.Router();

// POST /cart/:userId
cartRoutes.post('/cart/:userId', async (req: Request, res: Response) => {
    try {
        const { productId, quantity } = req.body;
        const userId = parseInt(req.params.userId);

        // Check if the product exists
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: `Product with ID ${productId} not found` });
        }

        // Find or create the user's cart
        let cart = await Cart.findOne({
            where: { userId }
        });

        if (!cart) {
            cart = await Cart.create({ userId });
        }

        // Add product to cart
        const cartItem = await CartItem.create({
            cartId: cart.cartId, // Associate the cart item with the user's cart
            productId,
            quantity,
            price: product.price // Assuming the price is fetched from the product
        });

        res.status(201).json(cartItem);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
});


// GET /cart/:userId
cartRoutes.get('/cart/:userId', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);

        // Find the user's cart
        const cart = await Cart.findOne({
            where: { userId }
        });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found for the user" });
        }

        // Find the orderId associated with the user's cart
        const cartId = cart.cartId;

        // Get cart items for the order
        const cartItems = await CartItem.findAll({
            where: { cartId }
        });

        // Fetch product details for each cart item
        const cartItemsWithProductDetails = await Promise.all(cartItems.map(async (cartItem) => {
            const product = await Product.findByPk(cartItem.productId);
            return {
                productId: cartItem.productId,
                quantity: cartItem.quantity,
                price: cartItem.price,
                product: product || {} // If product not found, return an empty object
            };
        }));

        // Calculate total price
        let totalPrice = 0;
        cartItems.forEach(cartItem => {
            totalPrice += cartItem.quantity * cartItem.price;
        });

        res.json({ cartItems: cartItemsWithProductDetails, totalPrice });
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
});

// DELETE /cart/:userId/item/:productId
cartRoutes.delete('/cart/:userId/item/:productId', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const productId = parseInt(req.params.productId);

        // Find the cart associated with the userId
        const cart = await Cart.findOne({ where: { userId } });
        if (!cart) {
            return res.status(404).json({ message: `Cart not found for the user with ID ${userId}` });
        }

        // Find and delete the cart item
        const cartItem = await CartItem.findOne({ where: { cartId: cart.cartId, productId } });
        if (!cartItem) {
            return res.status(404).json({ message: `Product with ID ${productId} not found in the cart` });
        }
        await cartItem.destroy();

        res.json({ message: 'Product removed from cart' });
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
});

export default cartRoutes;
