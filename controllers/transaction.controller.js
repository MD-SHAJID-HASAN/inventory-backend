import Transaction from "../models/transaction.model.js";
import ProductModel from "../models/productModel.model.js";
import mongoose from "mongoose";
import Summary from "../models/summary.model.js";

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
        continue;
      }

      if (product?.hasVariation) {
        // Find matching size
        const productWithSize = product.sizes.find((s) => s.size === item.size);

        if (!productWithSize) {
          throw new Error(
            `Size "${item.size}" not found for product: ${product.name}`
          );
        }

        const oldStock = productWithSize.currentStock || 0;
        console.log('Current stock of the product', oldStock)

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

   // calculate totalAmount from items if not present
let amount = transaction[0].totalAmount;
if (!amount || amount === 0) {
  amount = transaction[0].items.reduce(
    (sum, i) => sum + (i.unitPrice * i.quantity || 0),
    0
  );
  transaction[0].totalAmount = amount;
  await transaction[0].save({ session });
}

// get normalized day key
const trxDate = new Date(transaction[0].createdAt);
const dayKey = new Date(trxDate.getFullYear(), trxDate.getMonth(), trxDate.getDate());

// find or create summary
let summary = await Summary.findOne({ date: dayKey });
if (!summary) {
  summary = new Summary({
    date: dayKey,
    incomingTotal: 0,
    outgoingTotal: 0,
    inOutBasedOnShop: [],
  });
}

// update totals
if (transaction[0].transactionType === "incoming") summary.incomingTotal += amount;
else summary.outgoingTotal += amount;

// update per shop
if (transaction[0].shopId) {
  let shopEntry = summary.inOutBasedOnShop.find(
    (s) => s.shopId.toString() === transaction[0].shopId.toString()
  );

  if (!shopEntry) {
    summary.inOutBasedOnShop.push({
      shopId: transaction[0].shopId,
      incoming: transaction[0].transactionType === "incoming" ? amount : 0,
      outgoing: transaction[0].transactionType === "outgoing" ? amount : 0,
    });
  } else {
    if (transaction[0].transactionType === "incoming") shopEntry.incoming += amount;
    else shopEntry.outgoing += amount;
  }
}

// finally save summary
await summary.save({ session });


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
    const transactions = await Transaction.find().sort({ _id: -1 }).limit(10)
      .populate("items.ProductModelId", "modelName currentStock lastPurchasePrice");
    res.status(200).json({
      success: true,
      data: transactions,
    });

    console.log(transactions)
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
