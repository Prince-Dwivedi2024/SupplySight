import express from "express";
import {
  createSupplier,
  getSuppliers,
} from "../controllers/supplierControl.js";
import { validateSupplier } from "../middlewares/validateSupplier.js";

const supplierRoutes = express.Router();

supplierRoutes.post("/", validateSupplier, createSupplier);
supplierRoutes.get("/", getSuppliers);

export default supplierRoutes;
