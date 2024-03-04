import express, { Request, Response } from 'express';
import Product from '../models/Product';

const productRoutes = express.Router();

// GET /products
productRoutes.get('/products', async (req: Request, res: Response) => {
    try {
        console.log('productroutes')
        const { category, inStock } = req.query;
        let whereClause: any = {};

        if (category) {
            whereClause.category = category;
        }

        if (inStock === 'true') {
            whereClause.stock = { $gt: 0 }; // Assuming stock is greater than 0 means in stock
        }

        const products = await Product.findAll({ where: whereClause });
        res.json(products);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
});

// GET /products/:id
productRoutes.get('/products/:id', async (req: Request, res: Response) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
});

// POST /products
productRoutes.post('/products', async (req: Request, res: Response) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
});

// PUT /products/:id
productRoutes.put('/products/:id', async (req: Request, res: Response) => {
    try {
        const productId = parseInt(req.params.id);
        const updatedProduct = await Product.findByPk(productId);

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        await updatedProduct.update(req.body);
        res.json(updatedProduct);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
});

// DELETE /products/:id
productRoutes.delete('/products/:id', async (req: Request, res: Response) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.destroy();
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
});

export default productRoutes;
