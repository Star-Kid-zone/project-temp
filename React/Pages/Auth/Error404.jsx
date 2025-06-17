import { Link } from "react-router-dom";
import { FaHome, FaArrowLeft } from "react-icons/fa";

const Error404Page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-center">
      <div className="max-w-md">
        <img
          src="/placeholder.svg"
          alt="404 Error illustration"
          width={300}
          height={300}
          className="mx-auto mb-8"
        />

        <h1 className="mb-2 text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mb-4 text-3xl font-semibold text-gray-800">Page Not Found</h2>
        <p className="mb-8 text-gray-500">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily
          unavailable.
        </p>

        <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <FaHome className="mr-2 h-4 w-4" />
            Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <FaArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error404Page;
