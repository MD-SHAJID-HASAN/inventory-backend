import mongoose, { Types } from "mongoose";

const summarySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },
inOutBasedOnShop: [
  {
    shopId: { type: Types.ObjectId, ref: "Shop", required: true },
    incoming: { type: Number, default: 0 },
    outgoing: { type: Number, default: 0 },
  }
],
    incomingTotal: {
      type: Number,
      required: true,
      default: 0,
    },
    outgoingTotal: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

summarySchema.index({ date: 1 });

const Summary = mongoose.model("Summary", summarySchema);

export default Summary;