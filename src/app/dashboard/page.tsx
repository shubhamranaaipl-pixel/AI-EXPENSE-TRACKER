"use client";
import Card from "@/component/ui/card";
import ProtectedRoutes from "@/component/Protectedroute/ProtectedRoute";
import Chart from "@/component/Chart/chart";
import { useDashBoard } from "./useDashBoard";
import ThemeToggle from "@/component/ThemeToggle/ThemeToggle";

export default function Dashboard() {
  const { user, logout, dashboard } = useDashBoard();

  return (
    <ProtectedRoutes>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
  
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Hello, <span className="text-blue-600">{user?.name || "User"}</span> 👋
              </h1>
              <p className="text-sm text-gray-500 mt-1">Here is your financial overview for today.</p>
            </div>
            <ThemeToggle/>
            <button 
              onClick={() => logout()}
              className="self-start sm:self-center px-5 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 font-semibold rounded-xl text-sm transition-all duration-200"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Total Expense" value={dashboard?.totalExpense ?? 0} />
            <Card title="Total Balance" value={dashboard?.totalBalance ?? 0} />
            <Card title="Total Income" value={dashboard?.totalIncome ?? 0} />
          </div>

     
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Category Trends Graph</h2>
              <Chart
                type="line"
                data={dashboard?.categoryExpense ?? []}
                xAxisKey="_id"
                dataKey="total"
              />
            </div>

      
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Category Breakdown</h2>
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {dashboard?.categoryExpense?.map((item) => (
                  <div 
                    key={item._id} 
                    className="flex justify-between items-center p-3.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition duration-150 border border-gray-100"
                  >
                    <span className="font-semibold text-gray-700">{item._id || "Uncategorized"}</span>
                    <span className="font-bold text-gray-900">${item.total?.toLocaleString() ?? 0}</span>
                  </div>
                ))}
                {(!dashboard?.categoryExpense || dashboard.categoryExpense.length === 0) && (
                  <p className="text-sm text-gray-400 text-center py-6">No category data available.</p>
                )}
              </div>
            </div>

          </div>

         
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Transactions</h2>
            <div className="divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-100">
              {dashboard?.recentTransactions?.map((item) => {
              
                const isIncome = item.type === "income";
                return (
                  <div 
                    key={item._id} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white hover:bg-gray-50/50 gap-3 transition"
                  >
                    <div className="space-y-1">
                      <h4 className="font-semibold text-gray-900 text-base">{item.title || "Untitled Transaction"}</h4>
                      <p className="text-sm text-gray-500">{item.description || "No description provided"}</p>
                    </div>
                    
                   
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        isIncome 
                          ? "bg-green-50 text-green-600 border border-green-200" 
                          : "bg-red-50 text-red-600 border border-red-200"
                      }`}>
                        {item.type || "expense"}
                      </span>
                      <span className={`font-bold text-lg ${isIncome ? "text-green-600" : "text-gray-900"}`}>
                        {isIncome ? "+" : "-"}${item.amount?.toLocaleString() ?? 0}
                      </span>
                    </div>
                  </div>
                );
              })}
              {(!dashboard?.recentTransactions || dashboard.recentTransactions.length === 0) && (
                <p className="text-sm text-gray-400 text-center py-8 bg-gray-50/50">No transaction history found.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </ProtectedRoutes>
  );
}
