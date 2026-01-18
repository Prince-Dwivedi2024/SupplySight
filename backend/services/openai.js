import OpenAI from "openai";
import AppError from "../utils/AppError.js";

const useAI = process.env.USE_AI === "true";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🧠 MOCK AI (used when USE_AI=false)
const mockAnalyzeShipmentRisk = async ({ origin, destination }) => {
  // Simple heuristic to look intelligent
  let riskScore = 40;

  if (origin.country !== destination.country) riskScore += 20;
  if (["India", "China"].includes(origin.country)) riskScore += 15;

  const riskLevel =
    riskScore > 70 ? "High" : riskScore > 40 ? "Medium" : "Low";

  return {
    aiRiskScore: riskScore,
    riskLevel,
    riskFactors: [
      "Weather uncertainty",
      "Port congestion",
      "Cross-border logistics delay",
    ],
    summary:
      "Potential delays due to cross-border shipment and regional logistics challenges.",
  };
};

// 🧠 REAL AI (OpenAI)
const realAnalyzeShipmentRisk = async ({
  origin,
  destination,
  expectedDelivery,
}) => {
  try {
    const prompt = `
You are a senior supply chain risk analyst.

Analyze the following shipment and assess delay risks based on:
- Weather conditions
- Geopolitical tensions
- Logistics bottlenecks

Shipment Details:
Origin Country: ${origin.country}
Destination Country: ${destination.country}
Expected Delivery Date: ${expectedDelivery}

Respond ONLY in valid JSON with this structure:
{
  "aiRiskScore": number (0-100),
  "riskLevel": "Low" | "Medium" | "High",
  "riskFactors": [string],
  "summary": string
}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    throw new AppError("OpenAI analysis failed", 500);
  }
};

// 🔀 SINGLE EXPORT USED BY CONTROLLERS
export const analyzeShipmentRisk = async (payload) => {
  if (!useAI) {
    return mockAnalyzeShipmentRisk(payload);
  }

  return realAnalyzeShipmentRisk(payload);
};
