import mongoose from "mongoose";

const productModelSchema = new mongoose.model({
    shopId: {
        type: Types.objectId,
        ref: 'Shop',
        required: true,
    },
    categoryId: {
        type: Types.objectId,
        ref: 'Category',
        required: true,
    },
    brandId: {
        type: Types.objectId,
        ref: 'Brand',
        required: true,
    },
    modelName: {
        type: String,
        required: true,
        trim: true,
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
    currentStock: {
        type: Number,
        default: 0,
    },
    averageCost: {
        type: Number,
        default: 0,
    },
    lastPurchasePrice: {
        type: Number,
        default: 0,
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