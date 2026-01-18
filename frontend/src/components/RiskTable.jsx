import { useEffect, useState } from "react";
import api from "../services/api";

export default function RiskTable() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const res = await api.get("/shipments");
        setShipments(res.data.data);
      } catch (error) {
        console.error("Failed to load shipments");
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, []);

  const badgeColor = (level) => {
    if (level === "High") return "bg-red-100 text-red-700";
    if (level === "Medium") return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        Loading shipments...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Risk Overview
      </h2>

      <table className="w-full text-sm">
        <thead className="border-b text-slate-500">
          <tr>
            <th className="text-left py-2">Supplier</th>
            <th>Route</th>
            <th>Risk</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>
          {shipments.map((s) => (
            <tr key={s._id} className="border-b last:border-none">
              <td className="py-3">
                {s.supplier?.name || "Unknown"}
              </td>
              <td>
                {s.origin.country} → {s.destination.country}
              </td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${badgeColor(
                    s.latestRiskLevel
                  )}`}
                >
                  {s.latestRiskLevel}
                </span>
              </td>
              <td className="font-semibold">
                {s.latestRiskScore}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
