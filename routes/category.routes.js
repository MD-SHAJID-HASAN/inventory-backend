import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createCategory, getCategories, getCategoriesById, getCategoriesByShopId } from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.post('/', createCategory);
categoryRouter.get('/', getCategories);
categoryRouter.get('/:categoryId', getCategoriesById);
categoryRouter.get('/shop/:shopId', getCategoriesByShopId);

export default categoryRouter;