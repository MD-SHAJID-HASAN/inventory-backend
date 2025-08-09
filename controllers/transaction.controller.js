import Transaction from "../models/transaction.model.js"
import ProductModel from "../models/productModel.model.js";

export const createTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.create({
            ...req.body,
            user: req.user._id,
        });

        for (const item of transaction.items) {
            const product = await ProductModel.findById(item.productModelId);

            if (!product) continue; // or throw error if product not found

            if (transaction.transactionType === "incoming") {
                // Increase stock
                product.currentStock += item.quantity;

                // Update lastPurchasePrice and recalculate averageCost (if you want)
                product.lastPurchasePrice = item.unitPrice;
                // Simple average cost calculation example (weighted avg):
                const totalCostBefore = product.averageCost * product.currentStock;
                const totalNewCost = item.unitPrice * item.quantity;
                const newStockTotal = product.currentStock + item.quantity;
                product.averageCost = (totalCostBefore + totalNewCost) / newStockTotal;

            } else if (transaction.transactionType === "outgoing") {
                // Decrease stock
                product.currentStock -= item.quantity;

                // Optionally check if stock goes below zero
                if (product.currentStock < 0) {
                    return res.status(400).json({
                        success: false,
                        message: `Insufficient stock for product ${product.modelName}`,
                    });
                }
            }

            await product.save();
        }

        res.staus(201).json({ success: true, data: transaction });
    } catch (error) {
        next(error);
    }
}

export const getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json({
            success: true,
            data: transactions,
        });
    } catch (error) {
        next(error);
    }
}



export const getTransactionById = async (req, res, next) => {
    try {
        const transactionById = await Transaction.find({
            user: req.params.id
        });

        res.status(200).json({
            success: true, data: transactionById
        })

    } catch (error) {
        next(error);
    }
}