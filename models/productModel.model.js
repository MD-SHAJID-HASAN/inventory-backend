// import mongoose, { Types } from "mongoose";



// const sizesSchema = new mongoose.Schema({

//         size: {
//             type: String,
//         },

//         sizeUnit: {
//             type: String,
//         },
//         currentStock: {
//             type: Number,
//         },
//         purchasePrice: {
//             type: Number,
//         },

//         averageCost: {
//             type: Number,
//             default: 0,
//         },
//     }
// )


// const productModelSchema = new mongoose.Schema({
//     shopId: {
//         type: Types.ObjectId,
//         ref: 'Shop',
//         required: true,
//     },
//     categoryId: {
//         type: Types.ObjectId,
//         ref: 'Category',
//         // required: true, 
//     },
//     brandId: {
//         type: Types.ObjectId,
//         ref: 'Brand',
//         required: true,
//     },
//     name: {
//         type: String,
//         required: true,
//         trim: true,
//         required: true,
//     },

//     hasVariation: {
//         type: Boolean,
//         required: true,
//         default: true,
//     },

//     sizes: [sizesSchema],

//     unit: {
//         type: String,
//         required: [true, 'Size Unit is required!']
//     },
//     totalStock: {
//         type: Number,
//         default: 0,
//         required: [true, 'Current Stock is required!']
//     },

//     averageCost: {
//         type: Number,
//         default: 0,
//     },

//     isActive: {
//         type: Boolean,
//         default: true,
//     },
//     createdBy: {
//         type: String,
//         required: true,
//         trim: true,
//     },


// }, { timestamps: true });

// const ProductModel = mongoose.model('ProductModel', productModelSchema);

// export default ProductModel;


import mongoose, { Types } from "mongoose";

const sizesSchema = new mongoose.Schema({
    size: {
        type: String,
    },
    sizeUnit: {
        type: String,
    },
    currentStock: {
        type: Number,
        default: 0,
    },
    purchasePrice: {
        type: Number,
        default: 0,
    },
    averageCost: {
        type: Number,
        default: 0,
    },
});

const productModelSchema = new mongoose.Schema(
    {
        shopId: {
            type: Types.ObjectId,
            ref: "Shop",
            required: true,
        },
        categoryId: {
            type: Types.ObjectId,
            ref: "Category",
        },
        brandId: {
            type: Types.ObjectId,
            ref: "Brand",
            required: true,
        },
        name: {
            type: String,
            trim: true,
            required: [true, "Product name is required!"],
        },
        hasVariation: {
            type: Boolean,
            default: true,
        },
        sizes: [sizesSchema],
        unit: {
            type: String,
            required: [true, "Unit is required!"],
        },
        stock: {
            type: Number,
            default: 0,
            required: [true, "Current Stock is required!"],
        },
        purchasePrice: {
            type: Number,
            default: 0,
        },
        averageCost: {
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
    },
    { timestamps: true }
);

// Correct model creation — no extra schema in arguments
const ProductModel = mongoose.model("ProductModel", productModelSchema);

export default ProductModel;
