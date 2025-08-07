import mongoose from "mongoose";

const transactionSchema = mongoose.model({
    shopId: {
        type: Types.objectId,
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
            type: String,
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
        }
    }],
    createdBy: {
        type: String,
        required: true,
        trim: true,
    },


}, { Timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;