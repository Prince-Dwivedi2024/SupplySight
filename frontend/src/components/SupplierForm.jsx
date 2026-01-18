import { useState } from "react";
import api from "../services/api";

export default function SupplierForm() {
  const [form, setForm] = useState({
    name: "",
    country: "",
    reliabilityScore: "",
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
      await api.post("/suppliers", {
        name: form.name,
        country: form.country,
        reliabilityScore: Number(form.reliabilityScore),
      });

      setForm({ name: "", country: "", reliabilityScore: "" });

      // Simple refresh so supplier list is usable immediately
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add supplier");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Add Supplier
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Supplier Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        <input
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        <input
          name="reliabilityScore"
          type="number"
          placeholder="Reliability Score (0–100)"
          value={form.reliabilityScore}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Supplier"}
        </button>
      </form>
    </div>
  );
}
