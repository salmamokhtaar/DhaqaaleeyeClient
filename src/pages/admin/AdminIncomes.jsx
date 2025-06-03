import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaSpinner, FaSort, FaSortUp, FaSortDown, FaFileExport, FaFilter } from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const AdminIncomes = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [filters, setFilters] = useState({ source: '', minAmount: '', maxAmount: '', startDate: '', endDate: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem("token");

  const fetchIncomes = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/income/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncomes(res.data);
    } catch (err) {
      toast.error("Failed to fetch incomes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this income?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete(`http://localhost:3000/api/income/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              toast.success("Income deleted");
              fetchIncomes();
            } catch {
              toast.error("Failed to delete income");
            }
          }
        },
        {
          label: 'No'
        }
      ]
    });
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/api/income/${editData._id}`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Income updated");
      setEditData(null);
      fetchIncomes();
    } catch {
      toast.error("Failed to update income");
    }
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Source,Amount,Date,User\n"
      + filteredIncomes.map(income => 
          `${income.source},${income.amount},${new Date(income.date).toLocaleDateString()},${income.userId?.email || "N/A"}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `incomes_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredIncomes = useMemo(() => {
    return incomes
      .filter(income => {
        const matchesSearch = income.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            income.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSource = !filters.source || income.source.toLowerCase().includes(filters.source.toLowerCase());
        const matchesMinAmount = !filters.minAmount || income.amount >= Number(filters.minAmount);
        const matchesMaxAmount = !filters.maxAmount || income.amount <= Number(filters.maxAmount);
        const matchesStartDate = !filters.startDate || new Date(income.date) >= new Date(filters.startDate);
        const matchesEndDate = !filters.endDate || new Date(income.date) <= new Date(filters.endDate);
        
        return matchesSearch && matchesSource && matchesMinAmount && matchesMaxAmount && 
               matchesStartDate && matchesEndDate;
      })
      .sort((a, b) => {
        if (sortConfig.key === 'amount') {
          return sortConfig.direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
        }
        if (sortConfig.key === 'date') {
          return sortConfig.direction === 'asc' 
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date);
        }
        return sortConfig.direction === 'asc'
          ? a[sortConfig.key]?.localeCompare(b[sortConfig.key])
          : b[sortConfig.key]?.localeCompare(a[sortConfig.key]);
      });
  }, [incomes, sortConfig, filters, searchTerm]);

  const totalAmount = useMemo(() => 
    filteredIncomes.reduce((sum, income) => sum + Number(income.amount), 0)
  , [filteredIncomes]);

  useEffect(() => {
    fetchIncomes();
  }, []);

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="text-gray-400" />;
    return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto" />
          <p className="text-gray-600">Loading income data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Income Management</h2>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <FaFileExport /> Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500 text-sm">Total Income (Filtered)</h3>
          <p className="text-2xl font-bold text-green-600">${totalAmount.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500 text-sm">Number of Transactions</h3>
          <p className="text-2xl font-bold text-blue-600">{filteredIncomes.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500 text-sm">Average Transaction</h3>
          <p className="text-2xl font-bold text-purple-600">
            ${(totalAmount / (filteredIncomes.length || 1)).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search by source or user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-4 flex-wrap">
            <input
              type="number"
              placeholder="Min Amount"
              value={filters.minAmount}
              onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value }))}
              className="w-32 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Max Amount"
              value={filters.maxAmount}
              onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value }))}
              className="w-32 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="p-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('source')}
                >
                  <div className="flex items-center gap-2">
                    Source {renderSortIcon('source')}
                  </div>
                </th>
                <th 
                  className="p-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('amount')}
                >
                  <div className="flex items-center gap-2">
                    Amount {renderSortIcon('amount')}
                  </div>
                </th>
                <th 
                  className="p-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center gap-2">
                    Date {renderSortIcon('date')}
                  </div>
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">User</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredIncomes.map((income) => (
                <tr key={income._id} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    {editData?._id === income._id ? (
                      <input
                        value={editData.source}
                        onChange={(e) => setEditData({ ...editData, source: e.target.value })}
                        className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="font-medium text-gray-900">{income.source}</span>
                    )}
                  </td>
                  <td className="p-4">
                    {editData?._id === income._id ? (
                      <input
                        type="number"
                        value={editData.amount}
                        onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                        className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="text-green-600 font-medium">
                        + ${Number(income.amount).toFixed(2)}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-gray-500">
                    {new Date(income.date).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-gray-500">{income.userId?.email || "N/A"}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {editData?._id === income._id ? (
                        <button
                          onClick={handleEditSubmit}
                          className="text-sm bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition"
                        >
                          Save
                        </button>
                      ) : (
                        <button 
                          onClick={() => setEditData(income)}
                          className="text-blue-600 hover:text-blue-800 transition"
                        >
                          <FaEdit />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(income._id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredIncomes.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-8">
                    <div className="text-gray-400 space-y-2">
                      <FaFilter className="text-4xl mx-auto" />
                      <p>No income records found matching your filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminIncomes;
