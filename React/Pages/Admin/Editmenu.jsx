import { useEffect, useState } from "react";
import axios from "axios";

function EditMenuModal({ isOpen, onClose, menu, onUpdate }) {
  const [formData, setFormData] = useState({
    item: "",
    category: "",
    type: "",
    price: "",
    availability: false,
    popular: false,
  });

  const categories = ["Appetizer", "Main Course", "Dessert", "Beverage"];
  const types = ["Vegetarian", "Non-Vegetarian", "Vegan", "Gluten-Free"];

  useEffect(() => {
    if (menu) {
      setFormData({ ...menu });
    }
  }, [menu]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://127.0.0.1:8082/api/menu/${menu.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating menu:", error.response?.data || error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-green-700 mb-4">Edit Menu Item</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Item Name */}
          <div>
            <label className="block font-medium">Item Name:</label>
            <input
              type="text"
              name="item"
              value={formData.item}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block font-medium">Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Type Dropdown */}
          <div>
            <label className="block font-medium">Type:</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium">Price ($):</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center justify-between">
            <label className="font-medium">Available:</label>
            <input
              type="checkbox"
              name="availability"
              checked={formData.availability}
              onChange={handleChange}
              className="toggle-checkbox"
            />
          </div>

          {/* Popular Toggle */}
          <div className="flex items-center justify-between">
            <label className="font-medium">Popular:</label>
            <input
              type="checkbox"
              name="popular"
              checked={formData.popular}
              onChange={handleChange}
              className="toggle-checkbox"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMenuModal;
