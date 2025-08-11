import mongoose, { Types } from "mongoose";

const productModelSchema = new mongoose.Schema({
    shopId: {
        type: Types.ObjectId,
        ref: 'Shop',
        required: true,
    },
    categoryId: {
        type: Types.ObjectId,
        ref: 'Category',
        // required: true, 
    },
    brandId: {
        type: Types.ObjectId,
        ref: 'Brand',
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        required: true,
    },
    size: [{
        type: String,
        required: true,
    }],

    sizeUnit: {
        type: String,
        required: [true, 'Size Unit is required!']
    },
    currentStock: {
        type: Number,
        default: 0,
        required: [true, 'Current Stock is required!']
    },
    averageCost: {
        type: Number,
        default: 0,
    },
    lastPurchasePrice: {
        type: Number,
        default: 0,
        required: [true, 'Purchase Price is Required!']
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdBy: {
        type: String,
        required: true,
        trim: true,
    },


}, { Timestamps: true });

const ProductModel = mongoose.model('ProductModel', productModelSchema);

export default ProductModel;