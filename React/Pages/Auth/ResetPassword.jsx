import { useState } from "react";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="mx-auto flex w-full max-w-5xl flex-col md:flex-row">
        {/* Left side - Illustration */}
        <div className="flex flex-1 items-center justify-center p-6">
          <img
            src="/placeholder.svg"
            alt="Reset password illustration"
            width={400}
            height={400}
            className="max-w-full"
          />
        </div>

        {/* Right side - Reset password form */}
        <div className="flex flex-1 flex-col justify-center p-6">
          <div className="mx-auto w-full max-w-md space-y-6">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Reset Password
              </h1>
              <p className="text-gray-500">
                Create a new password for your account.
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="h-12 w-full rounded-md border border-gray-300 px-4 pr-10 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                  <span className="sr-only">Toggle password visibility</span>
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  className="h-12 w-full rounded-md border border-gray-300 px-4 pr-10 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                  <span className="sr-only">
                    Toggle confirm password visibility
                  </span>
                </button>
              </div>

              <button className="h-12 w-full rounded-md bg-green-600 font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                Reset Password
              </button>

              <div className="text-center text-sm">
                <Link
                  to="/sign-in"
                  className="inline-flex items-center font-medium text-green-600 hover:text-green-500"
                >
                  <FaArrowLeft className="mr-2 h-3 w-3" />
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
