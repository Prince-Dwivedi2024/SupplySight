import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";


mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function RiskMap() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // 1️⃣ Initialize map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [0, 20],
      zoom: 1.5,
    });

    // 2️⃣ Fetch heatmap data
    const loadHeatmap = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/heatmap`
      );

      const points = res.data.data;

      const geoJson = {
        type: "FeatureCollection",
        features: points.map((p) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [p.lng, p.lat],
          },
          properties: {
            intensity: p.intensity,
          },
        })),
      };

      mapRef.current.on("load", () => {
        // 3️⃣ Add source
        mapRef.current.addSource("risk-points", {
          type: "geojson",
          data: geoJson,
        });

        // 4️⃣ Heatmap layer
        mapRef.current.addLayer({
          id: "risk-heatmap",
          type: "heatmap",
          source: "risk-points",
          maxzoom: 9,
          paint: {
            "heatmap-weight": ["get", "intensity"],
            "heatmap-intensity": 1,
            "heatmap-radius": 30,
            "heatmap-opacity": 0.8,
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(33,102,172,0)",
              0.2,
              "rgb(103,169,207)",
              0.4,
              "rgb(209,229,240)",
              0.6,
              "rgb(253,219,199)",
              0.8,
              "rgb(239,138,98)",
              1,
              "rgb(178,24,43)",
            ],
          },
        });
      });
    };

    loadHeatmap();

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 h-[420px]">
      <h2 className="text-lg font-semibold text-slate-800 mb-2">
        Global Risk Heatmap
      </h2>

      <div
        ref={mapContainerRef}
        className="w-full h-full rounded-lg"
      />
    </div>
  );
}

