import mongoose from "mongoose";
import validator from "validator";

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Supplier name is required"],
      trim: true,
      minlength: 2,
    },

    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },

    reliabilityScore: {
      type: Number,
      min: [0, "Reliability score cannot be less than 0"],
      max: [100, "Reliability score cannot be more than 100"],
      default: 70,
    },
  },
  {
    timestamps: true,
  }
);

const supplierModel = mongoose.models.supplier || mongoose.model("supplier", supplierSchema);

export default supplierModel;
