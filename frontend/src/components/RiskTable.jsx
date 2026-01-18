export default function RiskTable({ shipments = [] }) {
  const badgeColor = (level) => {
    if (level === "High") return "bg-rose-100 text-rose-700";
    if (level === "Medium") return "bg-amber-100 text-amber-700";
    return "bg-emerald-100 text-emerald-700";
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Risk Overview
      </h2>

      <table className="w-full text-sm">
        <thead className="text-slate-500 border-b">
          <tr>
            <th className="text-left py-2">Supplier</th>
            <th>Route</th>
            <th>Risk</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>
          {shipments.map((s, i) => (
            <tr key={i} className="border-b last:border-none">
              <td className="py-3">{s.supplier}</td>
              <td>{s.origin} → {s.destination}</td>
              <td>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${badgeColor(s.riskLevel)}`}>
                  {s.riskLevel}
                </span>
              </td>
              <td className="font-semibold">{s.riskScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
