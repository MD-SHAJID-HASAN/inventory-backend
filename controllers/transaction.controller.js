import Transaction from "../models/transaction.model.js";
import ProductModel from "../models/productModel.model.js";
import mongoose from "mongoose";

export const createTransaction = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const transaction = await Transaction.create(
      [
        {
          ...req.body,
        },
      ],
      { session }
    );

    for (const item of transaction[0].items) {
      const product = await ProductModel.findById(item.ProductModelId).session(
        session
      );

      if (!product) {
        console.log("No product found!")
        continue;}

      if (product?.hasVariation) {
        // Find matching size
        const productWithSize = product.sizes.find((s) => s.size === item.size);

        if (!productWithSize) {
          throw new Error(
            `Size "${item.size}" not found for product: ${product.name}`
          );
        }

        const oldStock = productWithSize.currentStock || 0;
        console.log('Current stock of the product',oldStock)

        if (transaction[0].transactionType === "incoming") {
          productWithSize.currentStock = oldStock + item.quantity;
          productWithSize.purchasePrice = item.unitPrice;
          productWithSize.averageCost =
            (oldStock * (productWithSize.averageCost || 0) +
              item.quantity * item.unitPrice) /
            (oldStock + item.quantity);

        } else if (transaction[0].transactionType === "outgoing") {
          if (oldStock < item.quantity) {
            throw new Error(
              `Insufficient stock for ${product.name} - Size: ${item.size}`
            );
          }
          productWithSize.currentStock = oldStock - item.quantity;
        }

        // Recalculate total stock & average cost for whole product
        product.totalStock = product.sizes.reduce(
          (sum, s) => sum + (s.currentStock || 0),
          0
        );
        product.averageCost =
          product.totalStock > 0
            ? product.sizes.reduce(
                (sum, s) => sum + (s.averageCost * s.currentStock || 0),
                0
              ) / product.totalStock
            : 0;

      } else {
        // No variation → update totalStock directly
        const oldStock = product.totalStock || 0;

        if (transaction[0].transactionType === "incoming") {
          product.totalStock = oldStock + item.quantity;
          product.purchasePrice = item.unitPrice;
          product.averageCost =
            (oldStock * (product.averageCost || 0) +
              item.quantity * item.unitPrice) /
            (oldStock + item.quantity);

        } else if (transaction[0].transactionType === "outgoing") {
          if (oldStock < item.quantity) {
            throw new Error(
              `Insufficient stock for ${product.name} (no variation)`
            );
          }
          product.totalStock = oldStock - item.quantity;
        }
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
