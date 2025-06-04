import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt, FaMoneyBill, FaWallet, FaHome, FaArrowUp, FaArrowDown, FaSpinner } from 'react-icons/fa';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SidebarLayout from '../components/SidebarLayout';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = ['#800000', '#FF8042', '#0088FE'];

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const fetchData = async () => {
      try {
        setLoading(true);
        const [incomeRes, expenseRes] = await Promise.all([
          axios.get('https://dhaqaaleeyeserver.onrender.com/api/income', { headers }),
          axios.get('https://dhaqaaleeyeserver.onrender.com/api/expense', { headers }),
        ]);
        setIncomes(incomeRes.data);
        setExpenses(expenseRes.data);
        setError(null);
      } catch (error) {
        console.error('Error loading dashboard data', error);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalIncome = incomes.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpense = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const balance = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  const chartData = [
    { name: 'Total Balance', value: balance },
    { name: 'Total Income', value: totalIncome },
    { name: 'Total Expenses', value: totalExpense },
  ];

  const barData = incomes.map(income => ({
    date: new Date(income.date).toLocaleDateString(),
    amount: Number(income.amount),
  }));

  const recentTransactions = [
    ...expenses.map(e => ({ ...e, type: 'expense' })),
    ...incomes.map(i => ({ ...i, type: 'income' })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <FaSpinner className="w-8 h-8 text-[#800000] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-[#800000] text-white rounded hover:bg-[#600000]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <SidebarLayout>
      <div className="p-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {user?.name || 'User'}!</h2>
        <p className="text-gray-600 mb-8">Here's an overview of your financial status</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500">Total Balance</p>
              <FaWallet className="text-[#800000] w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">${balance.toFixed(2)}</h3>
            <p className="text-sm text-gray-500 mt-2">Current balance</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500">Total Income</p>
              <FaArrowUp className="text-green-500 w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">${totalIncome.toFixed(2)}</h3>
            <p className="text-sm text-gray-500 mt-2">Total earnings</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500">Total Expenses</p>
              <FaArrowDown className="text-red-500 w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">${totalExpense.toFixed(2)}</h3>
            <p className="text-sm text-gray-500 mt-2">Total spending</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500">Savings Rate</p>
              <FaMoneyBill className="text-blue-500 w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{savingsRate.toFixed(1)}%</h3>
            <p className="text-sm text-gray-500 mt-2">Of total income</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Financial Overview</h4>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={chartData} 
                    dataKey="value" 
                    outerRadius={100} 
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Income Trend</h4>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                  <Bar dataKey="amount" fill="#800000" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-semibold text-gray-800">Recent Transactions</h4>
            <Link to="/transactions" className="text-[#800000] hover:text-[#600000] text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((t) => (
              <div 
                key={t._id} 
                className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    t.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {t.type === 'income' ? (
                      <FaArrowUp className="text-green-600 w-5 h-5" />
                    ) : (
                      <FaArrowDown className="text-red-600 w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{t.source || t.category}</p>
                    <p className="text-sm text-gray-500">{new Date(t.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`font-semibold ${
                  t.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {t.type === 'income' ? '+' : '-'} ${Number(t.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Dashboard;
