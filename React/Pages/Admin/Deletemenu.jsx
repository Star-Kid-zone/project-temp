import axios from "axios";

function DeleteMenuModal({ isOpen, onClose, menuId, onDelete }) {
  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8082/api/menu/${menuId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onDelete(); // Refresh menu list
      onClose(); // Close modal
    } catch (error) {
      console.error("Error deleting menu item:", error.response?.data || error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold text-green-700">Confirm Delete</h2>
        <p className="mt-2 text-gray-600">Are you sure you want to delete this menu item?</p>

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteMenuModal;
