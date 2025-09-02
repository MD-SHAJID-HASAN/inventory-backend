import express from 'express';
import { swaggerUi, swaggerSpec } from './config/swagger.js';
import cors from 'cors';
import errorMiddleware from './middlewares/error.middleware.js';
import { PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import categoryRouter from './routes/category.routes.js';
import shopRouter from './routes/shop.routes.js';
import brandRouter from './routes/brand.routes.js';
import productModelRouter from './routes/productModel.routes.js';
import transactionRouter from './routes/transaction.routes.js';
import summaryRouter from './routes/summary.routes.js';

const app = express();



app.use(cors({
<<<<<<< HEAD
    origin: 'http://localhost:5173',  //frontend URL
=======
    origin: 'https://ledgerly-lilac.vercel.app',  //frontend URL
>>>>>>> 3cd0364fb80930c7a6112b70cf0334a3db7cd22d
    credentials: true,
}));

app.use(express.json()); // to parse JSON body

app.get('/', (req, res) => {
    res.send('Welcome to the Inventory Management API');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/shops', shopRouter);
app.use('/api/v1/brands', brandRouter);
app.use('/api/v1/productModels', productModelRouter);
app.use('/api/v1/transactions', transactionRouter);
app.use('/api/v1/summary', summaryRouter);


app.use(errorMiddleware);

app.listen(PORT, async () => {
    console.log(`The InventoryManagement API is running on http://localhost:${PORT}`);
    await connectToDatabase();
});

export default app;
