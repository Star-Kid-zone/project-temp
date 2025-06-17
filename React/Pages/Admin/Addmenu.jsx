import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddMenu() {
  const [formData, setFormData] = useState({
    item: "",
    price: "",
    description: "",
    availability: true,
    category: "",
    type: "",
    popular: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      await axios.post("http://127.0.0.1:8082/api/menu", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("Menu item added successfully!");
      navigate("/admin/listmenu");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add menu item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-green-700">Add New Menu Item</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Back
        </button>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Item Name */}
          <div className="bg-white shadow p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700">Item Name</label>
            <input
              type="text"
              name="item"
              value={formData.item}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Price */}
          <div className="bg-white shadow p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Description */}
          <div className="bg-white shadow p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-400 h-24"
            ></textarea>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Category */}
          <div className="bg-white shadow p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select Category</option>
              <option value="Drinks">Drinks</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>

          {/* Type */}
          <div className="bg-white shadow p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select Type</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>

          {/* Availability */}
          <div className="bg-white shadow p-4 rounded-lg flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Availability</label>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, availability: !formData.availability })}
              className={`px-4 py-2 rounded-lg ${
                formData.availability ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
              }`}
            >
              {formData.availability ? "Available" : "Unavailable"}
            </button>
          </div>

          {/* Popular Item */}
          <div className="bg-white shadow p-4 rounded-lg flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Popular Item</label>
            <input
              type="checkbox"
              name="popular"
              checked={formData.popular}
              onChange={handleChange}
              className="w-5 h-5"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Menu Item"}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}

export default AddMenu;
