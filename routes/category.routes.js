/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllowedUnit:
 *       type: object
 *       required:
 *         - value
 *       properties:
 *         value:
 *           type: string
 *           description: Allowed unit name
 *           example: kg
 *
 *     CategoryRequest:
 *       type: object
 *       required:
 *         - name
 *         - shopId
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the category
 *           example: Beverages
 *         shopId:
 *           type: string
 *           description: ID of the shop this category belongs to
 *           example: 64d21bc45678901234567890
 *         allowedUnits:
 *           type: array
 *           description: Units allowed for this category
 *           items:
 *             $ref: '#/components/schemas/AllowedUnit'
 *         brandIds:
 *           type: array
 *           description: Associated brand IDs
 *           items:
 *             type: string
 *             example: 64d21bc45678901234567891
 *         isActive:
 *           type: boolean
 *           description: Whether the category is active
 *           example: true
 *
 *     CategoryResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/CategoryRequest'
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               description: Auto-generated category ID
 *               example: 64d21bc45678901234567892
 *             createdBy:
 *               type: string
 *               description: User who created the category (set by server)
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
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryRequest'
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CategoryResponse'
 *       500:
 *         description: Server error
 */



import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createCategory, getCategories, getCategoriesById, getCategoriesByShopId } from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.post('/', createCategory);
categoryRouter.get('/', getCategories);
categoryRouter.get('/:categoryId', getCategoriesById);
categoryRouter.get('/shop/:shopId', getCategoriesByShopId);

export default categoryRouter;