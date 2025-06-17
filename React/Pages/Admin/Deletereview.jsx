import { useState } from "react";
import axios from "axios";

function DeleteReviewModal({ isOpen, onClose, reviewId, onDelete }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleDelete = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");
            await axios.delete(`http://127.0.0.1:8082/api/reviews/${reviewId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            onDelete();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete review");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <p className="mb-4">Are you sure you want to delete this review?</p>

                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 border rounded-md">Cancel</button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-md"
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteReviewModal;
