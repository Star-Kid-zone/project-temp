import { useState } from "react";
import axios from "axios";

function EditReviewModal({ isOpen, onClose, review, onUpdate }) {
    const [reviewLink, setReviewLink] = useState(review?.review_link || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleUpdate = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");
            await axios.put(
                `http://127.0.0.1:8082/api/reviews/${review.id}`,
                { review_link: reviewLink },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            onUpdate();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update review");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Edit Review</h2>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <input
                    type="text"
                    className="w-full p-2 border rounded-md mb-4"
                    value={reviewLink}
                    onChange={(e) => setReviewLink(e.target.value)}
                    placeholder="Enter new review link"
                />

                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 border rounded-md">Cancel</button>
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-green-600 text-white rounded-md"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditReviewModal;
