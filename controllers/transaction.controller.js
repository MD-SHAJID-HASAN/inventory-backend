import Transaction from "../models/transaction.model.js";
import ProductModel from "../models/productModel.model.js";
import mongoose from "mongoose";

export const createTransaction = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const transaction = await Transaction.create([{
            ...req.body,
            createdBy: req.user._id,
        }], { session });

        for (const item of transaction[0].items) {
            const product = await ProductModel.findById(item.ProductModelId).session(session);

            if (!product) continue;

            // Find the size entry
            const sizeEntry = product.sizes.find(s => s.size === item.size);
            if (!sizeEntry) {
                throw new Error(`Size ${item.size} not found for ${product.name}`);
            }

            const oldStock = sizeEntry.stock || 0;

            if (transaction[0].transactionType === "incoming") {
                sizeEntry.stock = oldStock + item.quantity;

                product.lastPurchasePrice = item.unitPrice;

                // Weighted average cost per product (not per size here)
                const totalCostBefore = (product.averageCost || 0) * oldStock;
                const totalNewCost = item.unitPrice * item.quantity;
                product.averageCost =
                    (totalCostBefore + totalNewCost) / (oldStock + item.quantity);

            } else if (transaction[0].transactionType === "outgoing") {
                if (oldStock < item.quantity) {
                    throw new Error(`Insufficient stock for ${product.name} - ${item.size}`);
                }
                sizeEntry.stock = oldStock - item.quantity;
            }

            await product.save({ session });
        }

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ success: true, data: transaction[0] });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};


export const getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find()
            .populate("items.ProductModelId", "modelName currentStock lastPurchasePrice");
        res.status(200).json({
            success: true,
            data: transactions,
        });
    } catch (error) {
        next(error);
    }
};

export const getTransactionById = async (req, res, next) => {
    try {
        const transactionById = await Transaction.find({
            user: req.params.id
        }).populate("items.ProductModelId", "modelName");

        res.status(200).json({
            success: true,
            data: transactionById,
        });
    } catch (error) {
        next(error);
    }
};
