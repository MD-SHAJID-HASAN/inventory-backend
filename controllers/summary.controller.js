// controllers/summary.controller.js

import Summary from "../models/summary.model.js";

/**
 * Helper: aggregate a list of DaySummary docs into totals + per-shop data
 */
const aggregateSummaries = (summaries) => {
  let incomingTotal = 0;
  let outgoingTotal = 0;
  const inOutBasedOnShop = {};

  summaries.forEach((s) => {
    incomingTotal += s.incomingTotal || 0;
    outgoingTotal += s.outgoingTotal || 0;

    s.inOutBasedOnShop.forEach((val) => {
      const shopId = val.shopId.toString();
      if (!inOutBasedOnShop[shopId]) {
        inOutBasedOnShop[shopId] = { incoming: 0, outgoing: 0 };
      }
      inOutBasedOnShop[shopId].incoming += val.incoming || 0;
      inOutBasedOnShop[shopId].outgoing += val.outgoing || 0;
    });
  });

  return { incomingTotal, outgoingTotal, inOutBasedOnShop };
};

/**
 * Get summary for a specific day
 */
export const getDaySummary = async (req, res, next) => {
  try {
    const queryDate = req.query.date ? new Date(req.query.date) : new Date();

    const start = new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate());
    const end = new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate() + 1);

    const summary = await Summary.find({
      date: { $gte: start, $lt: end },
    });

    if (!summary || summary.length === 0) {
      return res.status(200).json({
        success: true,
        data: { incomingTotal: 0, outgoingTotal: 0, inOutBasedOnShop: {} },
      });
    }

    res.status(200).json({
      success: true,
      data: aggregateSummaries(summary),
    });
  } catch (error) {
    next(error);
  }
};


/**
 * Get summary for a specific month
 */
export const getMonthSummary = async (req, res, next) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const month = parseInt(req.query.month) || new Date().getMonth() + 1;

    const start = new Date(Date.UTC(year, month - 1, 1));
    const end = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

    const summaries = await Summary.find({
      date: { $gte: start, $lte: end },
    });

    res.status(200).json({
      success: true,
      data: aggregateSummaries(summaries),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get summary for a custom date range (e.g., weekly, quarterly, yearly)
 */
export const getRangeSummary = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "startDate and endDate are required",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setUTCHours(23, 59, 59, 999);

    const summaries = await Summary.find({
      date: { $gte: start, $lte: end },
    });

    res.status(200).json({
      success: true,
      data: aggregateSummaries(summaries),
    });
  } catch (error) {
    next(error);
  }
};
