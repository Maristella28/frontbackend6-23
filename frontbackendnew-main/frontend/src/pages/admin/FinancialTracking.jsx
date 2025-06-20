import React, { useState } from 'react';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";


const FinancialTracking = () => {
  const [monthFilter, setMonthFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('2025');

  // Example data (replace this with data from your backend later)
  const financialData = [
    { id: 1, date: '2025-06-05', type: 'Income', category: 'Permit Fees', amount: 1500, description: 'New business permit' },
    { id: 2, date: '2025-06-06', type: 'Expense', category: 'Office Supplies', amount: 800, description: 'Printer ink and paper' },
    { id: 3, date: '2025-06-07', type: 'Income', category: 'Donations', amount: 5000, description: 'Community donation' },
    { id: 4, date: '2025-06-07', type: 'Expense', category: 'Event Supplies', amount: 2000, description: 'Barangay Fiesta' },
  ];

  // Calculate summary
  const totalIncome = financialData
    .filter(item => item.type === 'Income')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = financialData
    .filter(item => item.type === 'Expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const netBalance = totalIncome - totalExpense;

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="bg-white min-h-screen ml-64 pt-20 p-8 font-sans">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Barangay Financial Records</h1>

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <button className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600">
            + Add Transaction
          </button>

          <div className="flex items-center gap-4">
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="border px-10 py-2 rounded text-sm"
            >
              <option value="All">All Months</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>

            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="border px-10 py-2 rounded text-sm"
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>

            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Download Report
            </button>
          </div>
        </div>

        {/* Summary Panel */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-100 p-4 rounded shadow text-center">
            <h2 className="text-lg font-semibold text-green-700">Total Income</h2>
            <p className="text-2xl font-bold text-green-800">₱ {totalIncome.toLocaleString()}</p>
          </div>
          <div className="bg-red-100 p-4 rounded shadow text-center">
            <h2 className="text-lg font-semibold text-red-700">Total Expense</h2>
            <p className="text-2xl font-bold text-red-800">₱ {totalExpense.toLocaleString()}</p>
          </div>
          <div className="bg-lime-300 p-4 rounded shadow text-center">
            <h2 className="text-lg font-semibold text-black">Net Balance</h2>
            <p className="text-2xl font-bold text-black">₱ {netBalance.toLocaleString()}</p>
          </div>
        </div>

        {/* Financial Records Table */}
        <div className="shadow-lg border rounded-lg overflow-hidden">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-lime-300 text-black text-xs uppercase">
              <tr>
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Description</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-lime-100">
              {financialData.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        item.type === 'Income'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">₱ {item.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">{item.description}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default FinancialTracking;