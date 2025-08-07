import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    type: String,
    shopId: {
        type: Types.ObjectId,
        ref: 'Shop',
        required: true,
    },

    allowedUnits: [
        { type: String }],

    brandIds: [{
        type: Types.ObjectId,
        ref: 'Brand'
    }],
    isActive: {
        type: Boolean,
        default: true,
    },
    createdBy: {
        type: String,
        required: true,
        trim: true,
    },
}, {Timestamps: true})

const Category = mongoose.model('Category', categorySchema)

export default categorySchema;