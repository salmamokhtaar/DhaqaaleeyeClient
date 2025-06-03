import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaMoneyBill, FaMoneyCheck, FaSpinner } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { toast } from 'react-toastify';

// Updated color scheme for better visualization
const CHART_COLORS = {
  income: "#800000", // Maroon (primary brand color)
  expense: "#1e40af", // Deep blue
  gradient: ["#800000", "#9a3412", "#b91c1c", "#991b1b", "#7f1d1d"] // Maroon shades
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: [],
    incomes: [],
    expenses: [],
    recentTransactions: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        // Fetch all data in parallel
        const [usersRes, incomesRes, expensesRes] = await Promise.all([
          axios.get("http://localhost:3000/api/users", config),
          axios.get("http://localhost:3000/api/income/admin", config),
          axios.get("http://localhost:3000/api/expense/admin", config)
        ]);

        // Calculate totals and prepare recent transactions
        const totalIncomes = incomesRes.data.reduce((sum, income) => sum + Number(income.amount), 0);
        const totalExpenses = expensesRes.data.reduce((sum, expense) => sum + Number(expense.amount), 0);

        // Combine and sort recent transactions
        const recentTransactions = [
          ...incomesRes.data.map(income => ({
            ...income,
            type: 'income',
            date: new Date(income.createdAt).toLocaleDateString()
          })),
          ...expensesRes.data.map(expense => ({
            ...expense,
            type: 'expense',
            date: new Date(expense.createdAt).toLocaleDateString()
          }))
        ]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5); // Get only the 5 most recent transactions

        setStats({
          users: usersRes.data,
          incomes: incomesRes.data,
          expenses: expensesRes.data,
          totalUsers: usersRes.data.length,
          totalIncomes,
          totalExpenses,
          recentTransactions
        });
        setError(null);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data");
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <FaSpinner className="w-12 h-12 text-[#800000] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#600000] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Custom rendering for the pie chart labels
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Custom tooltip content
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-100">
          <p className="text-sm font-semibold text-gray-900">{payload[0].name}</p>
          <p className="text-sm text-gray-600">
            Amount: ${Number(payload[0].value).toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Admin Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {stats.totalUsers || 0}
              </h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
      
        </div>

        {/* Total Incomes Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Incomes</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                ${(stats.totalIncomes || 0).toLocaleString()}
              </h3>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
         
        </div>

        {/* Total Expenses Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Expenses</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                ${(stats.totalExpenses || 0).toLocaleString()}
              </h3>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
    
        </div>
      </div>

     <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
  <div className="flex items-center justify-between mb-6">
    <h4 className="text-2xl font-bold text-gray-800">Financial Overview</h4>
    <span className="text-sm text-gray-500">Monthly Summary</span>
  </div>

  {/* Chart */}
  <div className="relative h-[380px]">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={[
            { name: "Income", value: stats.totalIncomes || 0 },
            { name: "Expenses", value: stats.totalExpenses || 0 }
          ]}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={140}
          innerRadius={70}
          dataKey="value"
          stroke="#fff"
          strokeWidth={2}
        >
          <Cell fill={CHART_COLORS.income} />
          <Cell fill={CHART_COLORS.expense} />
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          formatter={(value) => (
            <span className="text-sm text-gray-700 font-medium">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* Summary Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
    <div className="bg-gradient-to-r from-[#ffe2e2] to-[#ffc7c7] text-[#800000] p-5 rounded-xl shadow-inner">
      <p className="text-sm font-semibold">Total Income</p>
      <p className="text-3xl font-extrabold mt-1">
        ${Number(stats.totalIncomes || 0).toLocaleString()}
      </p>
    </div>
    <div className="bg-gradient-to-r from-[#dbeafe] to-[#bfdbfe] text-[#1e40af] p-5 rounded-xl shadow-inner">
      <p className="text-sm font-semibold">Total Expenses</p>
      <p className="text-3xl font-extrabold mt-1">
        ${Number(stats.totalExpenses || 0).toLocaleString()}
      </p>
    </div>
  </div>
</div>


      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {stats.recentTransactions && stats.recentTransactions.length > 0 ? (
            stats.recentTransactions.map((transaction, index) => (
              <div key={index} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'income' ? 'bg-green-50' : 'bg-red-50'
                    }`}>
                      {transaction.type === 'income' ? (
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${Number(transaction.amount).toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-gray-500">
              No recent transactions found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
