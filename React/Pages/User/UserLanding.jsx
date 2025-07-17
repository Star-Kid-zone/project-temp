import React from "react"
import { FaUtensils, FaCreditCard, FaStar, FaPhone, FaFacebook } from "react-icons/fa"

// Mock API data - replace with actual API call
const apiData = {
  data: {
    business: {
      id: 4,
      business_name: "test cookware",
      phone: "1234567890",
      social_media: { fb: "http://fb.com" },
      merchant_id: "dsfsf",
      user_id: 4,
      active: true,
    },
    setting: {
      id: 3,
      user_id: 4,
      theme_colour: "rwerew",
      menubtn_status: true,
      paybtn_status: true,
      reviewbtn_status: true,
      special_offerstatus: true,
      menu_theme: 2134,
    },
  },
  status: true,
  message: "Business and Setting info retrieved successfully",
}

export default function BusinessLanding() {
  const { business, setting } = apiData.data

  // Handle navigation - replace with actual routing logic
  const handleNavigation = (page) => {
    console.log(`Navigating to ${page} page`)
    // Replace with actual routing logic like:
    // navigate(`/${page}`);
    // or window.location.href = `/${page}`;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize">
              {business.business_name}
            </h1>
            <div className="flex items-center space-x-4">
              {business.phone && (
                <a
                  href={`tel:${business.phone}`}
                  className="flex items-center text-green-600 hover:text-green-700"
                >
                  <FaPhone className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{business.phone}</span>
                </a>
              )}
              {business.social_media?.fb && (
                <a
                  href={business.social_media.fb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Welcome to {business.business_name}
            </h2>
            <p className="text-lg sm:text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Discover our amazing products and services. Your satisfaction is our priority.
            </p>

            {setting.special_offerstatus && (
              <div className="bg-yellow-400 text-yellow-900 px-6 py-3 rounded-full inline-block font-semibold mb-8">
                🎉 Special Offers Available!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Navigation Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Menu Button */}
          {setting.menubtn_status && (
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUtensils className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Menu</h3>
                <p className="text-gray-600 mb-6">
                  Explore our delicious selection of dishes and beverages
                </p>
                <button
                  onClick={() => handleNavigation("menu")}
                  className="w-full px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-colors duration-200"
                >
                  View Menu
                </button>
              </div>
            </div>
          )}

          {/* Payment Button */}
          {setting.paybtn_status && (
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCreditCard className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Make Payment</h3>
                <p className="text-gray-600 mb-6">
                  Quick and secure payment options for your convenience
                </p>
                <button
                  onClick={() => handleNavigation("payment")}
                  className="w-full px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-colors duration-200"
                >
                  Pay Now
                </button>
              </div>
            </div>
          )}

          {/* Review Button */}
          {setting.reviewbtn_status && (
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaStar className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Reviews</h3>
                <p className="text-gray-600 mb-6">
                  Share your experience and read what others say about us
                </p>
                <button
                  onClick={() => handleNavigation("reviews")}
                  className="w-full px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-colors duration-200"
                >
                  View Reviews
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h3>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
              {business.phone && (
                <a
                  href={`tel:${business.phone}`}
                  className="flex items-center text-green-600 hover:text-green-700 font-medium"
                >
                  <FaPhone className="w-5 h-5 mr-3" />
                  {business.phone}
                </a>
              )}
              {business.social_media?.fb && (
                <a
                  href={business.social_media.fb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  <FaFacebook className="w-5 h-5 mr-3" />
                  Follow us on Facebook
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-2 capitalize">
              {business.business_name}
            </h4>
            <p className="text-gray-400 text-sm">
              © 2024 {business.business_name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
