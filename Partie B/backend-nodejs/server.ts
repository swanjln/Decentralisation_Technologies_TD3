import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import cartRoutes from "./routes/CartRoutes";
import orderRoutes from "./routes/OrderRoutes";
import productRoutes from "./routes/ProductRoutes";
import userRoutes from "./routes/UserRoutes";

// Create Express application
const app = express();

(async () => {
  try {
    // Start the server
    const port = 3000; // You can change this to the desired port number
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Middleware to parse JSON request bodies
app.use(express.json());

// Use the imported route files as middleware
app.use(productRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use(userRoutes);

// Define route handlers
app.get('/api/liveness', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

export default app;
