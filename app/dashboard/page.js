"use client";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            Total Events
          </h2>
          <p className="text-3xl font-bold text-blue-600">12</p>
        </div>
        {/* Add more dashboard cards/stats as needed */}
      </div>
    </div>
  );
}
