import express from "express";
import {
  createShipment,
  getShipments,
} from "../controllers/shipmentControl.js";
import { validateShipment } from "../middlewares/validateShipment.js";

const shipmentRoutes = express.Router();

shipmentRoutes.post("/", validateShipment, createShipment);
shipmentRoutes.get("/", getShipments);

export default shipmentRoutes;
