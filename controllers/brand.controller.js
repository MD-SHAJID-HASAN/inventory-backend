import Brand from "../models/brand.model.js";

export const createBrand = async ( req, res, next) => {

    try {
        const { name, } = await req.body;

        const existingBrand = await Brand.findOne({ name });

        if (existingBrand) {
            const error = new Error("Brand already exists!")
            error.statusCode = 409;
            throw error;
        }

        const brand = await Brand.create({
            ...req.body,
            createdBy: req.user._id,
        })

        res.status(201).json({ success: true, data: brand })
    } catch (error) {
        next(error);
    }
}


export const getBrands = async ({ req, res, next }) => {

    const brands = await Brand.find({
        user: req.params.id
    });

    res.status(200).json({
        success: true, data: brands,
    })
}