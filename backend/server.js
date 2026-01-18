import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";

import connectDB from "./config/mongodb.js";

import supplierRoutes from "./routes/supplierRoutes.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";
import riskAnalysisRoutes from "./routes/riskAnalysisRoutes.js";

import errorHandler from "./middlewares/errorHandler.js";

// ✅ Create Express app
const app = express();

// ✅ Allowed frontend origins (Vite / future deploys)
const allowedOrigins = [
  "http://localhost:5173",
  // add deployed frontend URL later
];

// ✅ CORS configuration
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Security & logging middleware
app.use(helmet());
app.use(morgan("dev"));

// ✅ Body parser
app.use(express.json());

// ✅ Connect MongoDB
connectDB();

// ✅ Routes
app.use("/api/v1/suppliers", supplierRoutes);
app.use("/api/v1/shipments", shipmentRoutes);
app.use("/api/v1/risk-analyses", riskAnalysisRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("SupplySight AI Backend is running 🚀");
});

// ✅ Error handler (must be last)
app.use(errorHandler);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
