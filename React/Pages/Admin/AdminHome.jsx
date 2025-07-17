import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBuilding, FaPlus, FaStar } from "react-icons/fa";

function AdminHome() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add New Business",
      description: "Create and register a new business with contact and social media links.",
      icon: <FaPlus className="text-green-600 text-3xl" />,
      action: () => navigate("/admin/addbusiness"),
    },
    {
      title: "View Businesses",
      description: "Manage or edit all registered businesses.",
      icon: <FaBuilding className="text-blue-600 text-3xl" />,
      action: () => navigate("/admin/listbuisness"),
    },
    {
      title: "View Reviews",
      description: "Monitor reviews submitted by users for businesses.",
      icon: <FaStar className="text-yellow-500 text-3xl" />,
      action: () => navigate("/admin/reviews"),
    },
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Welcome, Admin 👋</h1>
        <p className="mt-2 text-gray-600">
          Use the dashboard below to manage businesses and user reviews.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer border border-gray-100"
            onClick={item.action}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gray-100 rounded-full">{item.icon}</div>
              <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
            </div>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminHome;
