import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const ForgotPassword = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="mx-auto flex w-full max-w-5xl flex-col md:flex-row">
        {/* Left side - Illustration */}
        <div className="flex flex-1 items-center justify-center p-6">
          <img
            src="/placeholder.svg"
            alt="Forgot password illustration"
            width={400}
            height={400}
            className="max-w-full"
          />
        </div>

        {/* Right side - Forgot password form */}
        <div className="flex flex-1 flex-col justify-center p-6">
          <div className="mx-auto w-full max-w-md space-y-6">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Forgot Password
              </h1>
              <p className="text-gray-500">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="h-12 w-full rounded-md border border-gray-300 px-4 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
              />

              <button className="h-12 w-full rounded-md bg-green-600 font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                Send Reset Link
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

export default ForgotPassword;
