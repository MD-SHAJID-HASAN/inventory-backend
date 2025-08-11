import mongoose from "mongoose";
import Category from "../models/category.model.js";


export const createCategory = async (req, res, next) => {
    try {

        const { name, } = req.body;

        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            const error = new Error("Category already exists!");
            error.statusCode = 409;
            throw error;
        }

        const category = await Category.create({
            ...req.body,
            createdBy: req.user._id,
        });

        res.status(201).json({ success: true, data: category })
    } catch (error) {
        next(error);
    }
}

export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({
            // createdBy: 'abc'
        });

        res.status(200).json({
            success: true, data: categories
        });
    } catch (error) {
        next(error);
    }
}

export const getCategoriesByShopId = async (req, res, next) => {
    try {
        const { shopId } = req.params;

        const categories = await Category.find({ shopId }).populate('brandIds');


        res.status(200).json({ success: true, data: categories })
    } catch (error) {
        next(error);
    }
}

export const getCategoriesById = async (req, res, next) => {
    try {
        const { categoryId } = req.params;

        const category = await Category.findById(categoryId).populate('brandIds')


        res.status(200).json({ success: true, data: category })
    } catch (error) {
        next(error);
    }
}