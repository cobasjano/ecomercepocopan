export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="max-w-2xl">
        <form className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Name</label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block font-semibold mb-2">Email</label>
            <input type="email" className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block font-semibold mb-2">Message</label>
            <textarea className="w-full px-4 py-2 border rounded-lg h-32"></textarea>
          </div>
          <button
            type="submit"
            className="bg-secondary text-white px-8 py-3 rounded-lg font-bold hover:bg-yellow-600"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
