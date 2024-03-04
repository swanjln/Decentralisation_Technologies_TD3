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
const User_1 = __importDefault(require("../models/User"));
const userRoutes = express_1.default.Router();
// CREATE - POST /users
userRoutes.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email } = req.body;
        const newUser = yield User_1.default.create({ username, password, email });
        res.status(201).json(newUser);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
}));
// READ - GET /users
userRoutes.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.findAll();
        res.json(users);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
}));
// READ - GET /users/:id
userRoutes.get('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id);
        const user = yield User_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
}));
// UPDATE - PUT /users/:id
userRoutes.put('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id);
        const { username, password, email } = req.body;
        const user = yield User_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        yield user.update({ username, password, email });
        res.json(user);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
}));
// DELETE - DELETE /users/:id
userRoutes.delete('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id);
        const user = yield User_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        yield user.destroy();
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
}));
exports.default = userRoutes;
