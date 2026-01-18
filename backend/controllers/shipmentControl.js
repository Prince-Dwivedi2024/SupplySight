import shipmentModel from "../models/shipmentModel.js";
import riskAnalysisModel from "../models/riskAnalysisModel.js";

/**
 * NOTE:
 * AI integration will be added here later
 */
export const createShipment = async (req, res, next) => {
  try {
    // 1️⃣ Create shipment
    const shipment = await shipmentModel.create(req.body);

    // 2️⃣ Mock AI response (replace with OpenAI later)
    const mockRisk = {
      aiRiskScore: 72,
      finalRiskScore: 78,
      riskLevel: "High",
      riskFactors: ["Weather delays", "Port congestion"],
      summary: "High chance of delay due to seasonal disruptions",
    };

    // 3️⃣ Save RiskAnalysis
    const riskAnalysis = await riskAnalysisModel.create({
      shipment: shipment._id,
      ...mockRisk,
    });

    // 4️⃣ Update shipment snapshot
    shipment.latestRiskScore = mockRisk.finalRiskScore;
    shipment.latestRiskLevel = mockRisk.riskLevel;
    shipment.latestRiskSummary = mockRisk.summary;
    shipment.latestRiskAnalysis = riskAnalysis._id;

    await shipment.save();

    res.status(201).json({
      success: true,
      data: shipment,
    });
  } catch (error) {
    next(error);
  }
};

export const getShipments = async (req, res, next) => {
  try {
    const shipments = await shipmentModel.find()
      .populate("supplier")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: shipments.length,
      data: shipments,
    });
  } catch (error) {
    next(error);
  }
};
