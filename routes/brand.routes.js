import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createBrand, getBrands } from "../controllers/brand.controller.js";

const brandRouter = Router();

brandRouter.post('/', authorize, createBrand);
brandRouter.get('/', authorize, getBrands)

export default brandRouter;