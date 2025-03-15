export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p className="text-gray-600">
            By using our converter, you agree to comply with all applicable laws
            and regulations regarding copyright and content usage.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Prohibited Use</h2>
          <p className="text-gray-600">
            You must not use our service for:
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Illegal content conversion</li>
              <li>Commercial resale of converted files</li>
              <li>Automated bulk conversions</li>
            </ul>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            3. Service Availability
          </h2>
          <p className="text-gray-600">
            We provide no guarantees of service uptime and reserve the right to
            modify or discontinue service without notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Liability</h2>
          <p className="text-gray-600">
            We are not responsible for any damages resulting from service use.
            Users are solely responsible for their conversions and content.
          </p>
        </section>
      </div>
    </div>
  );
}
