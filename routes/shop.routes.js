/**
 * @swagger
 * tags:
 *   name: Shops
 *   description: Shop management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Shop:
 *       type: object
 *       required:
 *         - name
 *         - location
 *         - owner
 *         - shopType
 *         - createdBy
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated shop ID
 *           example: 64d21bc45678901234567890
 *         name:
 *           type: string
 *           description: Name of the shop
 *           example: Tech World
 *         location:
 *           type: string
 *           description: Physical location
 *           example: 123 Main Street, New York
 *         owner:
 *           type: string
 *           description: Shop owner's name
 *           example: John Doe
 *         shopType:
 *           type: string
 *           description: Type/category of the shop
 *           example: Electronics
 *         isActive:
 *           type: boolean
 *           description: Whether the shop is active
 *           example: true
 *         createdBy:
 *           type: string
 *           description: User who created the shop
 *           example: admin@example.com
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
 * /shops:
 *   post:
 *     summary: Create a new shop
 *     tags: [Shops]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shop'
 *     responses:
 *       201:
 *         description: Shop created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *
 *   get:
 *     summary: Get all shops
 *     tags: [Shops]
 *     responses:
 *       200:
 *         description: List of shops
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shop'
 *       500:
 *         description: Server error
 */

import { Router } from "express";
import { createShop, getShops } from "../controllers/shop.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const shopRouter = Router();

shopRouter.post('/', createShop);
shopRouter.get('/', getShops);

export default shopRouter;
