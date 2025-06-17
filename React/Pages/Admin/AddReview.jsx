import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function AddReview() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [businesses, setBusinesses] = useState([]);

  // Fetch businesses for dropdown
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8082/api/business/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBusinesses(response.data.data);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    };
    fetchBusinesses();
  }, []);

  // Validation Schema
  const validationSchema = Yup.object().shape({
    review_link: Yup.string()
      .required("Review link is required")
      .url("Please enter a valid URL"),
    business_id: Yup.number()
      .required("Please select a business"),
  });

  // Handle Form Submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const response = await axios.post("http://127.0.0.1:8082/api/review", values, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("Review link added successfully!");
        navigate("/admin/listreview");
      } else {
        throw new Error("Failed to add review link");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
        err.response?.data?.error || 
        "Failed to add review link. Please try again.";
      setError(errorMessage);
      console.error("Add review error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-green-700">
          Add Review Link
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Back
        </button>
      </div>

      {/* Formik Form */}
      <Formik
        initialValues={{
          review_link: "",
          business_id: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="grid grid-cols-1 gap-4">
            {/* Review Link */}
            <div className="p-4 bg-white shadow rounded-lg">
              <label className="block text-sm font-medium text-gray-700">
                Review Link
              </label>
              <Field
                type="url"
                name="review_link"
                placeholder="https://example.com/review"
                className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-green-400 mt-1"
              />
              <ErrorMessage
                name="review_link"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Business Selection */}
            <div className="p-4 bg-white shadow rounded-lg">
              <label className="block text-sm font-medium text-gray-700">
                Business
              </label>
              <Field
                as="select"
                name="business_id"
                className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-green-400 mt-1"
              >
                <option value="">Select a business</option>
                {businesses.map((business) => (
                  <option key={business.id} value={business.id}>
                    {business.business_name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="business_id"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Review Link"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Error Message */}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}

export default AddReview;
