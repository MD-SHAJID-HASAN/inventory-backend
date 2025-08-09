import ProductModel from "../models/productModel.model.js"

export const createProductModel = async (req, res, next) => {
    try {

        const { name } = req.body;

        const existingProductModel = await ProductModel.findOne({ name });

        if (existingProductModel) {
            const error = new Error("Product Model Already Exists!");
            error.statusCode = 409;
            throw error;
        }

        const productModel = await ProductModel.create({
            ...req.body,
            user: req.user._id,
        });
        res.status(201).json({ success: true, data: productModel })

    } catch (error) {
        next(error)
    }
}

export const getProductModels = async (req, res, next) => {
    try {
        const productModel = await ProductModel.find({
            user: req.params.id
        });

        res.status(200).json({
            success: true, data: productModel
        })

    } catch (error) {
        next(error);
    }
}