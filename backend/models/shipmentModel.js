import mongoose from "mongoose";

/**
 * Embedded schema for geographic locations
 * Used for both origin and destination
 */
const locationSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      trim: true,
    },
    lat: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },
    lng: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },
  },
  { _id: false }
);

const shipmentSchema = new mongoose.Schema(
  {
    /** 🔗 Supplier relationship */
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: [true, "Supplier is required"],
      index: true,
    },

    /** 🌍 Route information */
    origin: {
      type: locationSchema,
      required: true,
    },

    destination: {
      type: locationSchema,
      required: true,
    },

    /** 📅 Logistics */
    expectedDelivery: {
      type: Date,
      required: [true, "Expected delivery date is required"],
    },

    /** ⚡ Cached risk snapshot (for dashboard & heatmap) */
    latestRiskScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
      index: true,
    },

    latestRiskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
      index: true,
    },

    latestRiskSummary: {
      type: String,
      trim: true,
    },

    /** 🔄 Reference to most recent AI analysis */
    latestRiskAnalysis: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RiskAnalysis",
    },
  },
  {
    timestamps: true,
  }
);

const shipmentModel = mongoose.model.shipment || mongoose.model("shipment", shipmentSchema);

export default shipmentModel;
