import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    userId: Yup.string()
      .min(5, "User ID must be at least 5 characters")
      .required("User ID is required"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one special character")
      .required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    setError(""); // Reset error before new request

    try {
      const response = await axios.post("http://127.0.0.1:8082/api/login", {
        user_id: values.userId,
        password: values.password,
      });

      console.log("Login successful:", response.data);
      alert("Login successful!");

      const { token, user } = response.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", user.role);

      // Role-based navigation
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "superadmin") {
        navigate("/superadmin");
      } else {
        navigate("/dashboard"); // Default route
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="mx-auto flex w-full max-w-5xl flex-col md:flex-row">
        {/* Left side - Illustration */}
        <div className="flex flex-1 items-center justify-center p-6">
          <img
            src="/placeholder.svg"
            alt="Login illustration"
            width={400}
            height={400}
            className="max-w-full"
          />
        </div>

        {/* Right side - Sign in form */}
        <div className="flex flex-1 flex-col justify-center p-6">
          <div className="mx-auto w-full max-w-md space-y-6">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Sign in to FreshCart
              </h1>
              <p className="text-gray-500">
                Welcome back to FreshCart! Enter your credentials to continue.
              </p>
            </div>

            <Formik
              initialValues={{ userId: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div className="space-y-4">
                    {/* User ID Input */}
                    <div>
                      <Field
                        type="text"
                        name="userId"
                        placeholder="User ID"
                        className="h-12 w-full rounded-md border border-gray-300 px-4 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                      />
                      <ErrorMessage name="userId" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="•••••"
                        className="h-12 w-full rounded-md border border-gray-300 px-4 pr-10 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                        <span className="sr-only">Toggle password visibility</span>
                      </button>
                      <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Field
                        type="checkbox"
                        name="remember"
                        id="remember"
                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <label htmlFor="remember" className="text-sm text-gray-500">
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Forgot password? </span>
                      <a href="/forgot-password" className="font-medium text-green-600 hover:text-green-500">
                        Reset It
                      </a>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 w-full rounded-md bg-green-600 font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </button>

                  {/* Sign Up Link */}
                  <div className="text-center text-sm text-gray-500">
                    Don&apos;t have an account?{" "}
                    <a href="/register" className="font-medium text-green-600 hover:text-green-500">
                      Sign Up
                    </a>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
