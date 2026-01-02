export default function ShippingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Shipping Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Mercado Libre Shipping</h2>
          <p className="text-gray-700 mb-4">
            We partner with Mercado Libre to provide fast and reliable shipping throughout
            Argentina and neighboring countries.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Fast delivery within 3-7 business days</li>
            <li>Real-time tracking</li>
            <li>Insured packages</li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Local Pickup</h2>
          <p className="text-gray-700 mb-4">
            Pick up your order at our store for free or at a discounted rate.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Ready within 24-48 hours</li>
            <li>No shipping costs</li>
            <li>Flexible pickup times</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
