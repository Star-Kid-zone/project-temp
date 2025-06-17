import { useState } from "react";
import axios from "axios";

function AddReview({ onReviewAdded }) {
    const [reviewLink, setReviewLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleAddReview = async () => {
        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const token = localStorage.getItem("token");
            await axios.post(
                "http://127.0.0.1:8082/api/reviews",
                { review_link: reviewLink },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccess("Review added successfully!");
            setReviewLink("");
            onReviewAdded();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add review");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add New Review</h2>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <input
                type="text"
                className="w-full p-2 border rounded-md mb-4"
                value={reviewLink}
                onChange={(e) => setReviewLink(e.target.value)}
                placeholder="Enter review link"
            />

            <button
                onClick={handleAddReview}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md"
                disabled={loading}
            >
                {loading ? "Adding..." : "Add Review"}
            </button>
        </div>
    );
}

export default AddReview;
