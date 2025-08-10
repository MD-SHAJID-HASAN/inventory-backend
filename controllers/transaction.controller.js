import Transaction from "../models/transaction.model.js";
import ProductModel from "../models/productModel.model.js";

export const createTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.create({
            ...req.body,
            createdBy: req.user._id,
        });

        for (const item of transaction.items) {
            const product = await ProductModel.findById(item.ProductModelId);



            if (!product) continue; // skip if product doesn't exist

            const oldStock = product.currentStock || 0;

            if (transaction.transactionType === "incoming") {
                // Increase stock
                product.currentStock = oldStock + item.quantity;

                // Update last purchase price
                product.lastPurchasePrice = item.unitPrice;

                console.log(item.unitPrice)
                console.log('testing the type here!',typeof(product.averageCost))

                // Weighted average cost calculation
                const totalCostBefore = (product.averageCost || 0) * oldStock;
                const totalNewCost = item.unitPrice * item.quantity;
                product.averageCost =
                    (totalCostBefore + totalNewCost) / (oldStock + item.quantity);

                                console.log('Updating product:', product.name, 'Old stock:', oldStock, 'Adding:', item.quantity);

            } else if (transaction.transactionType === "outgoing") {
                // Check stock availability first
                if (oldStock < item.quantity) {
                    return res.status(400).json({
                        success: false,
                        message: `Insufficient stock for ${product.modelName}`,
                    });
                }
                // Decrease stock
                product.currentStock = oldStock - item.quantity;
            }

            await product.save();
        }

        res.status(201).json({ success: true, data: transaction });
    } catch (error) {
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
