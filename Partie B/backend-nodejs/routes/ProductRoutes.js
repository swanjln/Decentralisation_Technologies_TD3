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
const Product_1 = __importDefault(require("../models/Product"));
const productRoutes = express_1.default.Router();
// GET /products
productRoutes.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, inStock } = req.query;
        let whereClause = {};
        if (category) {
            whereClause.category = category;
        }
        if (inStock === 'true') {
            whereClause.stock = { $gt: 0 }; // Assuming stock is greater than 0 means in stock
        }
        const products = yield Product_1.default.findAll({ where: whereClause });
        res.json(products);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
}));
// GET /products/:id
productRoutes.get('/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = parseInt(req.params.id);
        const product = yield Product_1.default.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
}));
// POST /products
productRoutes.post('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = yield Product_1.default.create(req.body);
        res.status(201).json(newProduct);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
}));
// PUT /products/:id
productRoutes.put('/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = parseInt(req.params.id);
        const updatedProduct = yield Product_1.default.findByPk(productId);
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        yield updatedProduct.update(req.body);
        res.json(updatedProduct);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
}));
// DELETE /products/:id
productRoutes.delete('/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = parseInt(req.params.id);
        const product = yield Product_1.default.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        yield product.destroy();
        res.json({ message: "Product deleted successfully" });
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
}));
exports.default = productRoutes;
