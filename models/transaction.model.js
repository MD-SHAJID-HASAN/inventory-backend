import mongoose, { Types } from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    shopId: {
      type: Types.ObjectId,
      ref: "Shop",
      required: [true, "Shop is required"],
    },
    party: {
      type: String,
      default: "N/A",
      required: true,
      trim: true,
    },
    transactionType: {
      type: String,
      enum: ["incoming", "outgoing"],
      required: true,
    },
    items: [
      {
        ProductModelId: {
          type: Types.ObjectId,
          ref: "ProductModel",
          required: true,
        },
        // For non-variation products, size and sizeUnit can be empty
        size: {
          type: String,
          default: "",
        },
        sizeUnit: {
          type: String,
          default: "",
        },
        quantity: {
          type: Number,
          required: true,
          min: [0, "Quantity must be a positive number"],
        },
        unitPrice: {
          type: Number,
          required: [true, "Unit Price is required!"],
          min: [0, "Unit Price must be a positive number"],
        },
      },
    ],

    total: {
      type: Number,
      required: true,
      trim: true,
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
