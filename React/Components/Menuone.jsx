import React from "react";

export default function Menuone({ items }) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-600">
              Menu Items
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Explore Our Dishes
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
              Browse through a curated selection of our offerings.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-6 space-y-4 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{item.item}</h3>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  item.availability ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                }`}>
                  {item.availability ? "Available" : "Unavailable"}
                </span>
              </div>

              <p className="text-gray-500 text-sm">{item.description}</p>

              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-medium text-gray-900">
                  ₹{parseFloat(item.price).toFixed(2)}
                </span>
                <div className="text-sm text-gray-500">
                  {item.category} | {item.type}
                </div>
              </div>

              {item.popular && (
                <div className="inline-block text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                  ★ Popular
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
