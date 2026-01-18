import { useState } from "react";

export default function ShipmentForm() {
  const [shipment, setShipment] = useState({
    supplierId: "",
    originCountry: "",
    originLat: "",
    originLng: "",
    destinationCountry: "",
    destinationLat: "",
    destinationLng: "",
    expectedDelivery: "",
  });

  const handleChange = (e) => {
    setShipment({ ...shipment, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Create Shipment
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <input name="supplierId" placeholder="Supplier ID" onChange={handleChange}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 col-span-2" />

        <input name="originCountry" placeholder="Origin Country" onChange={handleChange}
          className="border rounded-lg px-4 py-2" />
        <input name="destinationCountry" placeholder="Destination Country" onChange={handleChange}
          className="border rounded-lg px-4 py-2" />

        <input name="originLat" placeholder="Origin Lat" onChange={handleChange}
          className="border rounded-lg px-4 py-2" />
        <input name="originLng" placeholder="Origin Lng" onChange={handleChange}
          className="border rounded-lg px-4 py-2" />

        <input name="destinationLat" placeholder="Destination Lat" onChange={handleChange}
          className="border rounded-lg px-4 py-2" />
        <input name="destinationLng" placeholder="Destination Lng" onChange={handleChange}
          className="border rounded-lg px-4 py-2" />

        <input
          type="date"
          name="expectedDelivery"
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 col-span-2"
        />
      </div>

      <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
        Analyze Risk
      </button>
    </div>
  );
}
