import React from "react";

export default function Menutwo({ items }) {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="inline-block mb-2 text-sm font-medium text-blue-600 uppercase tracking-wide">
            Our Menu
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Discover Delicious Dishes
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Handcrafted meals made with love. Choose from a variety of categories and flavors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">{item.item}</h3>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      item.availability
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.availability ? "Available" : "Unavailable"}
                  </span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{parseFloat(item.price).toFixed(2)}
                  </span>
                  <div className="flex space-x-2 text-xs text-gray-500">
                    <span className="bg-gray-200 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <span className="bg-gray-200 px-2 py-0.5 rounded">{item.type}</span>
                  </div>
                </div>

                {item.popular && (
                  <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded font-medium">
                    ★ Popular
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
