import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function AddBusiness() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Validation Schema
  const validationSchema = Yup.object().shape({
    business_name: Yup.string().required("Business name is required"),
    phone: Yup.string()
      .matches(/^\d{10,15}$/, "Phone number must be 10-15 digits")
      .required("Phone number is required"),
    social_media: Yup.array().of(
      Yup.object().shape({
        platform: Yup.string().required("Platform name is required"),
        link: Yup.string().url("Enter a valid URL"),
      })
    ),
    active: Yup.boolean(),
  });

  // Handle Form Submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      // Convert social media array into expected format
      const formattedSocialMedia = values.social_media.reduce((acc, item) => {
        if (item.platform && item.link) {
          acc[item.platform.toLowerCase()] = item.link;
        }
        return acc;
      }, {});

      const payload = {
        business_name: values.business_name,
        phone: values.phone,
        social_media: formattedSocialMedia,
        active: values.active,
      };

      const response = await axios.post("http://127.0.0.1:8082/api/business", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("Business added successfully!");
        navigate("/admin/listbuisness");
      } else {
        throw new Error("Failed to add business");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to add business. Please try again.";
      setError(errorMessage);
      console.error("Add business error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-green-700">
          Add New Business
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
          business_name: "",
          phone: "",
          social_media: [],
          active: true,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Business Name */}
            <div className="p-4 bg-white shadow rounded-lg">
              <label className="block text-sm font-medium text-gray-700">
                Business Name
              </label>
              <Field
                type="text"
                name="business_name"
                className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-green-400"
              />
              <ErrorMessage
                name="business_name"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Phone */}
            <div className="p-4 bg-white shadow rounded-lg">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <Field
                type="text"
                name="phone"
                className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-green-400"
              />
              <ErrorMessage
                name="phone"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Social Media */}
            <div className="md:col-span-2 p-4 bg-white shadow rounded-lg">
              <label className="block text-sm font-medium text-gray-700">
                Social Media Links
              </label>

              {values.social_media.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-2 mt-2">
                  {/* Platform Name */}
                  <input
                    type="text"
                    value={item.platform}
                    onChange={(e) => {
                      const newSocialMedia = [...values.social_media];
                      newSocialMedia[index].platform = e.target.value;
                      setFieldValue("social_media", newSocialMedia);
                    }}
                    placeholder="Platform (e.g., Facebook)"
                    className="w-full md:w-1/3 p-2 border rounded-md outline-none focus:ring-2 focus:ring-green-400"
                  />

                  {/* Link */}
                  <input
                    type="url"
                    value={item.link}
                    onChange={(e) => {
                      const newSocialMedia = [...values.social_media];
                      newSocialMedia[index].link = e.target.value;
                      setFieldValue("social_media", newSocialMedia);
                    }}
                    placeholder="Enter link"
                    className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-green-400"
                  />

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const newSocialMedia = values.social_media.filter(
                        (_, i) => i !== index
                      );
                      setFieldValue("social_media", newSocialMedia);
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* Add Social Media Button */}
              <button
                type="button"
                onClick={() =>
                  setFieldValue("social_media", [
                    ...values.social_media,
                    { platform: "", link: "" },
                  ])
                }
                className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-md"
              >
                + Add Social Media
              </button>

              <ErrorMessage
                name="social_media"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Active Status Toggle */}
            <div className="p-4 bg-white shadow rounded-lg flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Active</label>
              <button
                type="button"
                onClick={() => setFieldValue("active", !values.active)}
                className={`px-4 py-2 rounded-md ${
                  values.active
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {values.active ? "Active" : "Inactive"}
              </button>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Business"}
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

export default AddBusiness;
