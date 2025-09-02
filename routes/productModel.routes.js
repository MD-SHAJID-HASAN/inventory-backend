/**
 * @swagger
 * tags:
 *   name: ProductModels
 *   description: Product model management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Size:
 *       type: object
 *       required:
 *         - size
 *         - sizeUnit
 *       properties:
 *         size:
 *           type: string
 *           description: Size value
 *           example: "L"
 *         sizeUnit:
 *           type: string
 *           description: Unit of the size
 *           example: "kg"
 *         currentStock:
 *           type: number
 *           description: Current stock for this size
 *           example: 50
 *         purchasePrice:
 *           type: number
 *           description: Purchase price for this size
 *           example: 100
 *         averageCost:
 *           type: number
 *           description: Average cost for this size
 *           example: 105
 *
 *     ProductModelRequest:
 *       type: object
 *       required:
 *         - name
 *         - shopId
 *         - brandId
 *         - unit
 *         - totalStock
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the product model
 *           example: iPhone 14
 *         shopId:
 *           type: string
 *           description: ID of the shop
 *           example: 64d21bc45678901234567890
 *         categoryId:
 *           type: string
 *           description: ID of the category
 *           example: 64d21bc45678901234567891
 *         brandId:
 *           type: string
 *           description: ID of the brand
 *           example: 64d21bc45678901234567892
 *         hasVariation:
 *           type: boolean
 *           description: Whether the product has variations
 *           example: true
 *         sizes:
 *           type: array
 *           description: List of size variations
 *           items:
 *             $ref: '#/components/schemas/Size'
 *         unit:
 *           type: string
 *           description: Unit of measurement
 *           example: kg
 *         totalStock:
 *           type: number
 *           description: Total stock across all sizes
 *           example: 100
 *         purchasePrice:
 *           type: number
 *           description: Purchase price
 *           example: 1000
 *         averageCost:
 *           type: number
 *           description: Average cost
 *           example: 1050
 *         isActive:
 *           type: boolean
 *           description: Whether the product is active
 *           example: true
 *
 *     ProductModelResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/ProductModelRequest'
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               description: Auto-generated product model ID
 *               example: 64d21bc45678901234567893
 *             createdBy:
 *               type: string
 *               description: User who created the product model
 *               readOnly: true
 *               example: admin@example.com
 *             createdAt:
 *               type: string
 *               format: date-time
 *               description: Creation timestamp
 *               example: 2025-08-15T14:48:00.000Z
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               description: Last update timestamp
 *               example: 2025-08-15T14:48:00.000Z
 */

/**
 * @swagger
 * /product-models:
 *   post:
 *     summary: Create a new product model
 *     tags: [ProductModels]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductModelRequest'
 *     responses:
 *       201:
 *         description: Product model created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductModelResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *
 *   get:
 *     summary: Get all product models
 *     tags: [ProductModels]
 *     responses:
 *       200:
 *         description: List of product models
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductModelResponse'
 *       500:
 *         description: Server error
 *
 * /product-models/{categoryId}/{brandId}:
 *   get:
 *     summary: Get product models by category and brand
 *     tags: [ProductModels]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *       - in: path
 *         name: brandId
 *         required: true
 *         schema:
 *           type: string
 *         description: Brand ID
 *     responses:
 *       200:
 *         description: List of filtered product models
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductModelResponse'
 *       500:
 *         description: Server error
 *
 * /product-models/{categoryId}:
 *   get:
 *     summary: Get product models by category
 *     tags: [ProductModels]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: List of product models for the category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductModelResponse'
 *       500:
 *         description: Server error
 */



import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createProductModel, getProductModels, getProductModelsByCategoryAndBrandId, getProductModelsByCategoryId, } from "../controllers/productModel.controller.js";

const productModelRouter = Router();

productModelRouter.post('/', createProductModel);
productModelRouter.get('/',  getProductModels);
productModelRouter.get('/:categoryId/:brandId',  getProductModelsByCategoryAndBrandId);
productModelRouter.get('/:categoryId', getProductModelsByCategoryId);

export default productModelRouter;