import express from 'express';
import cors from 'cors';
import errorMiddleware from './middlewares/error.middleware.js';
import { PORT } from './config/env.js'; // adjust if needed
import connectToDatabase from './database/mongodb.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import categoryRouter from './routes/category.routes.js';
import shopRouter from './routes/shop.routes.js';
import brandRouter from './routes/brand.routes.js';
import productModelRouter from './routes/productModel.routes.js';
import transactionRouter from './routes/transaction.routes.js';

const app = express();



app.use(cors({
    origin: 'http://localhost:5173',  // your frontend URL
    credentials: true,                 // if you want to send cookies/auth headers
}));

app.use(express.json()); // to parse JSON body

app.get('/', (req, res) => {
    res.send('Welcome to the Inventory Management API');
});

// Your other routes will go here...
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/shops', shopRouter);
app.use('/api/v1/brands', brandRouter);
app.use('/api/v1/productModels', productModelRouter);
app.use('/api/v1/transactions', transactionRouter);

// Error middleware should be after all routes
app.use(errorMiddleware);

app.listen(PORT, async () => {
    console.log(`The InventoryManagement API is running on http://localhost:${PORT}`);
    await connectToDatabase();
});

export default app;
