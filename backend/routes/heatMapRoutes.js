import express from "express";
import { getRiskHeatmap } from "../controllers/heatMapControl.js";

const heatMapRoutes = express.Router();

heatMapRoutes.get("/", getRiskHeatmap);

export default heatMapRoutes;
