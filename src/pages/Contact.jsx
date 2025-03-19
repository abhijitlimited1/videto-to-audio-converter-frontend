import { useState } from "react";
import {
  FiMail,
  FiSmartphone,
  FiMapPin,
  FiAlertTriangle,
  FiCheckCircle,
} from "react-icons/fi";
import { FiLoader } from "react-icons/fi";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const response = await fetch("https://formspree.io/f/mqapaeyv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-6xl mx-auto my-12 px-4 md:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have questions, suggestions, or need support? We're here to help!
          Reach out for technical assistance, partnership opportunities, or
          feedback to improve our service.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 bg-white rounded-xl shadow-lg p-6 md:p-8">
        {/* Contact Reasons & Info */}
        <div className="space-y-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Why Contact Us?</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-3">
                <FiAlertTriangle className="flex-shrink-0 mt-1 text-blue-600" />
                <span>Report technical issues or bugs you've encountered</span>
              </li>
              <li className="flex items-start gap-3">
                <FiCheckCircle className="flex-shrink-0 mt-1 text-blue-600" />
                <span>Suggest new features or improvements</span>
              </li>
              <li className="flex items-start gap-3">
                <FiMail className="flex-shrink-0 mt-1 text-blue-600" />
                <span>Request partnerships or API access</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">FAQ</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium">How soon will I get a response?</p>
                <p className="text-gray-600 text-sm">
                  Typically within 24 hours during business days
                </p>
              </div>
              <div>
                <p className="font-medium">Do you offer technical support?</p>
                <p className="text-gray-600 text-sm">
                  Yes! We provide free support for all users
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="How can we help you?"
                rows="5"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {submitError && (
              <div className="bg-red-50 p-4 rounded-lg flex items-center gap-3 text-red-700">
                <FiAlertTriangle className="flex-shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {submitSuccess && (
              <div className="bg-green-50 p-4 rounded-lg flex items-center gap-3 text-green-700">
                <FiCheckCircle className="flex-shrink-0" />
                <span>
                  Message sent successfully! We'll respond within 24 hours.
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <div className="flex items-center justify-center gap-2">
                  <FiLoader className="animate-spin" />
                  Sending...
                </div>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
