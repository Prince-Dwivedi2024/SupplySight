import SupplierForm from "../components/SupplierForm";
import ShipmentForm from "../components/ShipmentForm";
import RiskTable from "../components/RiskTable";
import RiskMap from "../components/RiskMap";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          SupplySight AI
        </h1>
        <p className="text-slate-500">
          AI-Driven Supply Chain Risk Monitor
        </p>
      </header>

      {/* Top Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <SupplierForm />
        <ShipmentForm />
        <RiskMap />
      </section>

      {/* Bottom Section */}
      <section>
        <RiskTable />
      </section>
    </div>
  );
}
