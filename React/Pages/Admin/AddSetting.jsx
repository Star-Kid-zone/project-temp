import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function AddSetting() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Validation Schema
  const validationSchema = Yup.object().shape({
    user_id: Yup.number().required("User ID is required"),
    theme_colour: Yup.string().required("Theme color is required"),
    menu_theme: Yup.string().required("Menu theme is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setError(null);
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://127.0.0.1:8082/api/settings", values, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Setting added successfully!");
      navigate("/admin/listsetting");
    } catch (err) {
      setError("Failed to add setting");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-green-700">
          Add New Setting
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md shadow hover:bg-gray-300"
        >
          Back
        </button>
      </div>

      {/* Form */}
      <Formik
        initialValues={{
          user_id: "",
          theme_colour: "",
          menubtn_status: true,
          paybtn_status: true,
          reviewbtn_status: true,
          special_offerstatus: true,
          menu_theme: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User ID */}
            <div className="p-4 bg-white shadow-md rounded-lg">
              <label className="block text-sm font-medium text-gray-700">User ID</label>
              <Field
                type="number"
                name="user_id"
                className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-green-400"
              />
              <ErrorMessage name="user_id" component="p" className="text-red-500 text-sm" />
            </div>

            {/* Theme Color */}
            <div className="p-4 bg-white shadow-md rounded-lg">
              <label className="block text-sm font-medium text-gray-700">Theme Color</label>
              <Field
                type="text"
                name="theme_colour"
                className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-green-400"
              />
              <ErrorMessage name="theme_colour" component="p" className="text-red-500 text-sm" />
            </div>

            {/* Menu Theme */}
            <div className="p-4 bg-white shadow-md rounded-lg">
              <label className="block text-sm font-medium text-gray-700">Menu Theme</label>
              <Field
                type="text"
                name="menu_theme"
                className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-green-400"
              />
              <ErrorMessage name="menu_theme" component="p" className="text-red-500 text-sm" />
            </div>

            {/* Toggle Buttons for Status Fields */}
            {["menubtn_status", "paybtn_status", "reviewbtn_status", "special_offerstatus"].map(
              (field) => (
                <div key={field} className="p-4 bg-white shadow-md rounded-lg flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    {field.replace(/_/g, " ").toUpperCase()}
                  </label>
                  <button
                    type="button"
                    onClick={() => setFieldValue(field, !values[field])}
                    className={`px-6 py-2 rounded-md shadow-md transition ${
                      values[field] ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {values[field] ? "Active" : "Inactive"}
                  </button>
                </div>
              )
            )}

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-700 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Setting"}
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

export default AddSetting;
