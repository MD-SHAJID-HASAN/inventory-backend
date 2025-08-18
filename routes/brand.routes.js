/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Brand management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       required:
 *         - name
 *         - isActive
 *         - createdBy
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated brand ID
 *           example: 64d21bc45678901234567834
 *         name:
 *           type: string
 *           description: Name of the brand
 *           example: Walton
 *         isActive:
 *           type: boolean
 *           description: Whether the brand is active
 *           example: true
 *         createdBy:
 *           type: string
 *           description: User who created the brand
 *           example: admin@gmail.com
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *           example: 2025-08-15T14:48:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *           example: 2025-08-15T14:48:00.000Z
 */

/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *     responses:
 *       201:
 *         description: Brand created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 * 
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: List of brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 *       500:
 *         description: Server error
 */




import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createBrand, getBrands } from "../controllers/brand.controller.js";

const brandRouter = Router();

brandRouter.post('/', authorize, createBrand);
brandRouter.get('/', getBrands)

export default brandRouter;