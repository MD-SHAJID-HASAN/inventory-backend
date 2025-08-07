import express from 'express';
import errorMiddleware from './middlewares/error.middleware.js';
import {PORT} from './config/env.js'; // adjust if needed
import connectToDatabase from './database/mongodb.js';

const app = express();

app.use(express.json()); // to parse JSON body

app.get('/', (req, res) => {
    res.send('Welcome to the Inventory Management API');
});

// Your other routes will go here...

// Error middleware should be after all routes
app.use(errorMiddleware);

app.listen(PORT, async () => {
    console.log(`The InventoryManagement API is running on http://localhost:${PORT}`);
    await connectToDatabase();
});

export default app;
