import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createProductModel, getProductModels } from "../controllers/productModel.controller.js";

const productModelRouter = Router();

productModelRouter.post('/', authorize, createProductModel);
productModelRouter.get('/', authorize, getProductModels);

export default productModelRouter;