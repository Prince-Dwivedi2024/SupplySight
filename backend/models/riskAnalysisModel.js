import mongoose from "mongoose";

const riskAnalysisSchema = new mongoose.Schema(
  {
    shipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipment",
      required: true,
      index: true,
    },

    aiRiskScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    finalRiskScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },

    riskFactors: {
      type: [String],
      default: [],
    },

    summary: {
      type: String,
      trim: true,
    },

    analyzedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const riskAnalysisModel = mongoose.model.riskAnalysis || mongoose.model("riskAnalysis", riskAnalysisSchema);

export default riskAnalysisModel;
