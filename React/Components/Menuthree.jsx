import React from "react";

export default function Menuthree({ items }) {
  return (
    <section className="w-full py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left sm:text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Our Specialties
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl sm:mx-auto">
            Carefully crafted meals to satisfy your cravings and delight your taste buds.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200 flex flex-col sm:flex-row gap-4"
            >
              {/* Optional Image Placeholder */}
              <div className="w-full sm:w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0" />

              {/* Text Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.item}
                  </h3>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full inline-flex items-center ${
                      item.availability
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.availability ? "✔ Available" : "✖ Unavailable"}
                  </span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 text-xs text-gray-500 pt-2">
                  <span className="bg-gray-200 px-2 py-0.5 rounded">{item.category}</span>
                  <span className="bg-gray-200 px-2 py-0.5 rounded">{item.type}</span>
                  {item.popular && (
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-medium">
                      ★ Popular
                    </span>
                  )}
                </div>

                <div className="pt-3 text-lg font-bold text-gray-900">
                  ₹{parseFloat(item.price).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
