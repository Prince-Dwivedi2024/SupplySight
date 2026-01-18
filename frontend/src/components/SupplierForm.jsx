import { useState } from "react";

export default function SupplierForm() {
  const [form, setForm] = useState({
    name: "",
    country: "",
    reliabilityScore: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Add Supplier
      </h2>

      <div className="space-y-4">
        <input
          name="name"
          placeholder="Supplier Name"
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
        />

        <input
          name="country"
          placeholder="Country"
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
        />

        <input
          name="reliabilityScore"
          type="number"
          placeholder="Reliability Score (0-100)"
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
          Save Supplier
        </button>
      </div>
    </div>
  );
}
