import express from "express";
import {
  getRiskAnalysesByShipment,
} from "../controllers/riskAnalysisControl.js";

const riskAnalysisRoutes = express.Router();

riskAnalysisRoutes.get("/:shipmentId", getRiskAnalysesByShipment);

export default riskAnalysisRoutes;
