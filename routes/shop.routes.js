import { Router } from "express";
import { createShop, getShops } from "../controllers/shop.controller.js";
import authorize from "../middlewares/auth.middleware.js";


const shopRouter = Router();
shopRouter.post('/', authorize, createShop);
shopRouter.get('/', getShops);

export default shopRouter;