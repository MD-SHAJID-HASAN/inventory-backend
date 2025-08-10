import Shop from "../models/shop.model.js";

export const createShop = async (req, res, next) => {
    try {

        const { name } = req.body;

        const existingShop = await Shop.findOne({ name });

        if (existingShop) {
            const error = new Error("Shop already exists");
            error.statusCode = 409;
            throw error;
        }

        const shop = await Shop.create({
            ...req.body,
            createdBy: req.user._id,
        })

        res.status(201).json({ success: true, data: shop })
    } catch (error) {
        next(error);
    }
}

export const getShops = async (req, res, next) => {

    try {
        const shops = await Shop.find({
            createdBy: req.params.id
        })

        res.status(200).json({
            success: true, data: shops
        });

    } catch (error) {
        next(error);
    }
}
