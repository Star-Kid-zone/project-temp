import { useState } from "react";
import axios from "axios";

function AddPayment({ onPaymentAdded }) {
  const [paymentLink, setPaymentLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddPayment = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found.");
      }

      await axios.post(
        "http://127.0.0.1:8082/api/payments",
        { payment_link: paymentLink },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Payment link added successfully!");
      setPaymentLink("");
      if (onPaymentAdded) onPaymentAdded();
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to add payment link";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg w-96">
      <h2 className="text-lg font-semibold mb-4">Add New Payment</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}

      <input
        type="text"
        className="w-full p-2 border rounded-md mb-4"
        value={paymentLink}
        onChange={(e) => setPaymentLink(e.target.value)}
        placeholder="Enter payment link"
      />

      <button
        onClick={handleAddPayment}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-md"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Payment"}
      </button>
    </div>
  );
}

export default AddPayment;
