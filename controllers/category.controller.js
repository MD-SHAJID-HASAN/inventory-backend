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
            user: req.user._id,
        });

        res.status(201).json({ success: true, data: category })
    } catch (error) {
        next(error);
    }
}

export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({
            user: req.params.id
        });

        res.status(200).json({
            success: true, data: categories
        });
    } catch (error) {
        next(error);
    }
}