import { useEffect, useRef } from "react";

export default function RiskMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    // Mapbox GL setup will go here
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 h-[420px]">
      <h2 className="text-lg font-semibold text-slate-800 mb-2">
        Global Risk Heatmap
      </h2>

      <div
        ref={mapRef}
        className="w-full h-full rounded-lg bg-slate-100 flex items-center justify-center text-slate-400"
      >
        Map Loading...
      </div>
    </div>
  );
}
