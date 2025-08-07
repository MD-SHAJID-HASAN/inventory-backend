import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createCategory, getCategory } from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.post('/', authorize, createCategory)
categoryRouter.get('/', authorize, getCategory)

export default categoryRouter;