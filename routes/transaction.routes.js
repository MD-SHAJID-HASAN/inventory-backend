import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createTransaction, getTransactionById, getTransactions } from "../controllers/transaction.controller.js";

const transactionRouter = Router();

transactionRouter.post('/', authorize, createTransaction);
transactionRouter.get('/', authorize, getTransactions);
transactionRouter.get('/:id', authorize, getTransactionById);
// transactionRouter.delete('/:id', authorize, deleteTransaction);
// transactionRouter.put('/:id', authorize, updateTransaction)

export default transactionRouter;