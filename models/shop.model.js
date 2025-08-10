import mongoose, { Types } from "mongoose";

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },

    location: {
        type: String,
        trim: true,
        required: true,
    },
    owner: {
        type: String,
        trim: true,
        required: true,
    },
    shopType: {
        type: String,
        trim: true,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdBy: {
        // type: Types.ObjectId,
        // ref: 'User',
        type: String,
        required: true,
        trim: true,
    },

}, {Timestamps: true})

const Shop = mongoose.model('Shop', shopSchema)

export default Shop;