import AppError from "../utils/AppError.js";

export const validateRiskAnalysis = (req, res, next) => {
  const { aiRiskScore, finalRiskScore, riskLevel } = req.body;

  if (
    aiRiskScore === undefined ||
    finalRiskScore === undefined ||
    !riskLevel
  ) {
    return next(new AppError("Invalid risk analysis payload", 400));
  }

  next();
};
