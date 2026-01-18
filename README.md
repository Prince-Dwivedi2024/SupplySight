🌍 SupplySight AI
AI-Driven Supply Chain Risk Monitor

SupplySight AI is a full-stack web application that analyzes and visualizes supply chain risks using AI.
It allows users to manage suppliers and shipments, assess potential delays caused by weather, geopolitics, and logistics bottlenecks, and visualize global risk exposure through an interactive heatmap.

This project focuses on realistic system design, clean backend architecture, and production-ready data flows.

✨ Key Features

Supplier Management

Create and manage suppliers with reliability scores

Shipment Creation & Tracking

Define shipment routes with origin, destination, and expected delivery dates

AI-Driven Risk Analysis

Integrates with OpenAI to evaluate shipment risk

Forecasts potential delays based on external factors

Global Risk Heatmap

Visualizes shipment risk intensity on a world map using Mapbox

Highlights high-risk regions and routes

Risk Overview Dashboard

Displays shipment risk level and score in a structured table

Designed for fast reads using cached risk snapshots

🧠 Architecture Overview

The system is designed with clear separation of concerns:

Frontend (React)
  ├── SupplierForm
  ├── ShipmentForm
  ├── RiskTable
  └── RiskMap
        ↓
Backend (Node.js + Express)
  ├── REST APIs
  ├── AI Service Layer
  ├── Heatmap Aggregation
  └── Error Handling Middleware
        ↓
MongoDB Atlas
  ├── Suppliers
  ├── Shipments (cached risk)
  └── RiskAnalyses (AI history)

Key Design Decisions

AI risk history is stored separately from shipments

Latest risk snapshot is cached on shipments for fast dashboard rendering

Heatmap reads from cached data instead of recomputing AI results

Controllers remain thin; AI logic lives in a dedicated service layer

🛠️ Tech Stack
Frontend

React.js (Vite)

Tailwind CSS

Mapbox GL JS

Axios

Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

OpenAI API

Helmet, CORS, Morgan

📁 Project Structure
backend/
 ├── config/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── services/
 ├── middlewares/
 ├── utils/
 └── server.js

frontend/
 ├── components/
 ├── pages/
 ├── services/
 └── main.jsx

🔌 API Endpoints
Method	Endpoint	Description
POST	/api/v1/suppliers	Create a supplier
GET	/api/v1/suppliers	List all suppliers
POST	/api/v1/shipments	Create shipment + run AI risk analysis
GET	/api/v1/shipments	List shipments with latest risk
GET	/api/v1/heatmap	Get risk heatmap data
GET	/api/v1/risk-analyses/:shipmentId	Get AI risk history for a shipment
⚙️ Environment Variables
Backend (backend/.env)
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
OPENAI_API_KEY=your_openai_api_key
USE_AI=true

Frontend (frontend/.env)
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_MAPBOX_TOKEN=your_mapbox_access_token

▶️ Running the Project Locally
Backend
cd backend
npm install
nodemon server.js

Frontend
cd frontend
npm install
npm run dev

🧪 AI Integration Notes

OpenAI is accessed through a service layer, not directly in controllers

AI responses are constrained to structured JSON

Risk analysis results are:

Stored historically (RiskAnalysis)

Cached for performance (Shipment)

This allows:

Efficient dashboards

Future re-analysis

Auditable AI decisions

🚀 Deployment

Frontend: Vercel / Netlify

Backend: Render / Railway / Fly.io

Database: MongoDB Atlas

MongoDB network access must allow deployed server IPs.

🎯 Why This Project Matters

This project demonstrates:

Real-world backend architecture

Practical AI integration (not just API calls)

Performance-aware data modeling

Clean separation of logic layers

Scalable visualization design

It is built as a foundation for a real SaaS product, not just a demo.

👤 Author

Prince Dwivedi
Full-Stack Developer (MERN)
Focus: System Design, Backend Architecture, AI-Integrated Applications

📌 Future Enhancements

Supplier dropdown in shipment creation

Risk re-analysis triggers

Risk history visualization

Role-based dashboards

Scheduled AI re-evaluation

⭐ If you find this project useful, feel free to star the repository.
