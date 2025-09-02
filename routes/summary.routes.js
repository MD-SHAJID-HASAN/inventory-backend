import { Router } from "express";
import { getDaySummary, getMonthSummary, getRangeSummary } from "../controllers/summary.controller.js";
import { backfillSummary } from "../controllers/temp.summary.controller.js";

const summaryRouter = Router();

summaryRouter.get('/day', getDaySummary);
summaryRouter.get('/month', getMonthSummary);
summaryRouter.get('/range', getRangeSummary);
// TEMP route to backfill existing data
summaryRouter.get("/backfill", backfillSummary);

export default summaryRouter;