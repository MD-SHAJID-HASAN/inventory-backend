import mongoose, { Types } from "mongoose";

const transactionSchema = new mongoose.Schema({
    shopId: {
        type: Types.ObjectId,
        ref: 'Shop',
        required: [true, 'Shop Type is required']
    },
    party: {
        type: String,
        default: 'N/A',
        required: true,
    },
    transactionType: {
        type: String,
        enum: ['incoming', 'outgoing'],
        required: true,
    },
    items: [{
        ProductModelId: {
            type: Types.ObjectId,
            ref: 'ProductModel',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
        sizeUnit: {
            type: String,
            required: true,
        },
        unitPrice: {
            type: Number,
            required: [true, 'Unit Price is required!']
        }
    }],
    createdBy: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
