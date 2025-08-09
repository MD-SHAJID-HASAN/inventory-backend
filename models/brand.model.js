import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
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

}, {Timestamps: true})

const Brand = mongoose.model('Brand', brandSchema)

export default Brand;