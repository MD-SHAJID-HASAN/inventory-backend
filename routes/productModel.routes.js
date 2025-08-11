import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createProductModel, getProductModels, getProductModelsByCategoryAndBrandId, } from "../controllers/productModel.controller.js";

const productModelRouter = Router();

productModelRouter.post('/', createProductModel);
productModelRouter.get('/',  getProductModels);
productModelRouter.get('/:categoryId/:brandId',  getProductModelsByCategoryAndBrandId);

export default productModelRouter;