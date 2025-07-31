import { useState } from "react";
import axios from "axios";

function AddReview({ onReviewAdded }) {
    const [reviewLink, setReviewLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [placeQuery, setPlaceQuery] = useState("");
    const [placeResults, setPlaceResults] = useState([]);
    const [placeSearchLoading, setPlaceSearchLoading] = useState(false);
    const [placeSearchError, setPlaceSearchError] = useState("");

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

    const handleSearchPlace = async () => {
        try {
            setPlaceSearchLoading(true);
            setPlaceSearchError("");
            setPlaceResults([]);

            const response = await axios.get("http://127.0.0.1:8082/api/places/search", {
                params: { query: placeQuery },
            });

            setPlaceResults(response.data.data);
        } catch (err) {
            setPlaceSearchError(err.response?.data?.message || "Failed to search places");
        } finally {
            setPlaceSearchLoading(false);
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
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md mb-4"
                disabled={loading}
            >
                {loading ? "Adding..." : "Add Review"}
            </button>

            <hr className="my-4" />

            <h3 className="text-md font-medium mb-2">Search Google Place ID</h3>

            <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                value={placeQuery}
                onChange={(e) => setPlaceQuery(e.target.value)}
                placeholder="Search place name (e.g., Eiffel Tower)"
            />

            <button
                onClick={handleSearchPlace}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md mb-2"
                disabled={placeSearchLoading}
            >
                {placeSearchLoading ? "Searching..." : "Search Place"}
            </button>

            {placeSearchError && <p className="text-red-500 text-sm">{placeSearchError}</p>}

            {placeResults.length > 0 && (
                <div className="mt-2">
                    <h4 className="font-semibold text-sm mb-1">Search Results:</h4>
                    <ul className="text-sm space-y-1 max-h-40 overflow-y-auto">
                        {placeResults.map((place, index) => (
                            <li key={index} className="p-2 bg-gray-100 rounded">
                                <div><strong>Name:</strong> {place.name}</div>
                                <div><strong>Address:</strong> {place.formatted_address}</div>
                                <div><strong>Place ID:</strong> {place.place_id}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default AddReview;
