import { useState, useEffect } from "react";
import axios from "axios";

function EditPaymentModal({ isOpen, onClose, payment, onUpdate }) {
    const [paymentLink, setPaymentLink] = useState(payment?.payment_link || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Update local state when modal opens with a new payment
    useEffect(() => {
        if (isOpen && payment) {
            setPaymentLink(payment.payment_link || "");
            setError("");
        }
    }, [isOpen, payment]);

    if (!isOpen) return null;

    const handleUpdate = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");
            await axios.put(
                `http://127.0.0.1:8082/api/payments/${payment.id}`,
                { payment_link: paymentLink },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            onUpdate(); // Refresh or re-fetch after update
            onClose();  // Close the modal
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update payment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Edit Payment</h2>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <input
                    type="text"
                    className="w-full p-2 border rounded-md mb-4"
                    value={paymentLink}
                    onChange={(e) => setPaymentLink(e.target.value)}
                    placeholder="Enter new payment link"
                />

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-md hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditPaymentModal;
