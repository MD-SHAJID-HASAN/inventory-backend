import mongoose, { Types } from "mongoose";

const AllowedUnitSchema = new mongoose.Schema({
  value: { type: String, required: true },
});

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Category Name is Mandatory!"],
        unique: true,
    },
    shopId: {
        type: Types.ObjectId,
        ref: 'Shop',
        required: true,
    },

    allowedUnits: [
        AllowedUnitSchema],

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

export default Category;