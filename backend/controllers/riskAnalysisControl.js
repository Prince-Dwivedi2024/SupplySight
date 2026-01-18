import riskAnalysisModel from "../models/riskAnalysisModel.js";

export const getRiskAnalysesByShipment = async (req, res, next) => {
  try {
    const { shipmentId } = req.params;

    const analyses = await riskAnalysisModel.find({ shipment: shipmentId })
      .sort({ analyzedAt: -1 });

    res.status(200).json({
      success: true,
      count: analyses.length,
      data: analyses,
    });
  } catch (error) {
    next(error);
  }
};
