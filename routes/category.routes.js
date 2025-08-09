import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createCategory, getCategories } from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.post('/', authorize, createCategory)
categoryRouter.get('/', authorize, getCategories)

export default categoryRouter;