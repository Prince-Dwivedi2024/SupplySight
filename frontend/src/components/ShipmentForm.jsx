import { useState } from "react";
import api from "../services/api";

export default function ShipmentForm() {
  const [form, setForm] = useState({
    supplier: "",
    originCountry: "",
    originLat: "",
    originLng: "",
    destinationCountry: "",
    destinationLat: "",
    destinationLng: "",
    expectedDelivery: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        supplier: form.supplier,
        origin: {
          country: form.originCountry,
          lat: Number(form.originLat),
          lng: Number(form.originLng),
        },
        destination: {
          country: form.destinationCountry,
          lat: Number(form.destinationLat),
          lng: Number(form.destinationLng),
        },
        expectedDelivery: form.expectedDelivery,
      };

      await api.post("/shipments", payload);

      // Reset form
      setForm({
        supplier: "",
        originCountry: "",
        originLat: "",
        originLng: "",
        destinationCountry: "",
        destinationLat: "",
        destinationLng: "",
        expectedDelivery: "",
      });

      // Simple refresh strategy
      window.location.reload();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create shipment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Create Shipment
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          name="supplier"
          placeholder="Supplier ID"
          value={form.supplier}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 col-span-2"
          required
        />

        <input
          name="originCountry"
          placeholder="Origin Country"
          value={form.originCountry}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
          required
        />

        <input
          name="destinationCountry"
          placeholder="Destination Country"
          value={form.destinationCountry}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
          required
        />

        <input
          name="originLat"
          placeholder="Origin Latitude"
          value={form.originLat}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
          required
        />

        <input
          name="originLng"
          placeholder="Origin Longitude"
          value={form.originLng}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
          required
        />

        <input
          name="destinationLat"
          placeholder="Destination Latitude"
          value={form.destinationLat}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
          required
        />

        <input
          name="destinationLng"
          placeholder="Destination Longitude"
          value={form.destinationLng}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
          required
        />

        <input
          type="date"
          name="expectedDelivery"
          value={form.expectedDelivery}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 col-span-2"
          required
        />

        {error && (
          <p className="text-red-600 text-sm col-span-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="col-span-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Analyzing Risk..." : "Create Shipment"}
        </button>
      </form>
    </div>
  );
}
