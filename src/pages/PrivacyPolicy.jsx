export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">
            1. Information Collection
          </h2>
          <p className="text-gray-600">
            We collect minimal personal data necessary for conversion
            operations. When you use our service, we may temporarily store
            uploaded files and URLs for processing purposes only.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Data Usage</h2>
          <p className="text-gray-600">
            Your data is used solely for providing conversion services. We do
            not share, sell, or distribute any user information to third
            parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Cookies</h2>
          <p className="text-gray-600">
            We use only essential cookies for website functionality. No tracking
            cookies or third-party analytics are employed.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Security</h2>
          <p className="text-gray-600">
            All conversions are performed over secure HTTPS connections.
            Uploaded files are automatically deleted within 1 hour of conversion
            completion.
          </p>
        </section>
      </div>
    </div>
  );
}
