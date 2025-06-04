import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaSpinner } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const AdminExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  const token = localStorage.getItem("token");

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://dhaqaaleeyeserver.onrender.com/api/expense/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(res.data);
    } catch (err) {
      toast.error("Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this expense?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await axios.delete(`https://dhaqaaleeyeserver.onrender.com/api/expense/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              toast.success("Expense deleted");
              fetchExpenses();
            } catch {
              toast.error("Failed to delete expense");
            }
          },
        },
        { label: "No" },
      ],
    });
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `https://dhaqaaleeyeserver.onrender.com/api/expense/${editData._id}`,
        editData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Expense updated");
      setEditData(null);
      fetchExpenses();
    } catch {
      toast.error("Failed to update expense");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto" />
          <p className="text-gray-600">Loading expense data...</p>
        </div>
      </div>
    );
  }

  const totalAmount = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const averageAmount = totalAmount / (expenses.length || 1);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Expense Management</h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500 text-sm">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-600">-${totalAmount.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500 text-sm">Number of Transactions</h3>
          <p className="text-2xl font-bold text-blue-600">{expenses.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500 text-sm">Average Transaction</h3>
          <p className="text-2xl font-bold text-purple-600">
            -${averageAmount.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                  Category
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                  Amount
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                  Date
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                  User
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {expenses.map((expense) => (
                <tr key={expense._id} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    {editData?._id === expense._id ? (
                      <input
                        value={editData.category}
                        onChange={(e) =>
                          setEditData({ ...editData, category: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      expense.category
                    )}
                  </td>
                  <td className="p-4 text-red-600">
                    {editData?._id === expense._id ? (
                      <input
                        type="number"
                        value={editData.amount}
                        onChange={(e) =>
                          setEditData({ ...editData, amount: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      `- $${Number(expense.amount).toFixed(2)}`
                    )}
                  </td>
                  <td className="p-4">{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="p-4">{expense.userId?.email || "N/A"}</td>
                  <td className="p-4">
                    <div className="flex gap-3 items-center">
                      {editData?._id === expense._id ? (
                        <button
                          onClick={handleEditSubmit}
                          className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                          Save
                        </button>
                      ) : (
                        <button 
                          onClick={() => setEditData(expense)}
                          className="text-blue-600 hover:text-blue-800 transition"
                        >
                          <FaEdit />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(expense._id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminExpenses;
