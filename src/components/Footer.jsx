export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p>© 2025 Video2Audio. All rights reserved.</p>
          <div className="mt-2">
            <a href="/privacy" className="mx-2 hover:text-blue-400">
              Privacy Policy
            </a>
            <a href="/terms" className="mx-2 hover:text-blue-400">
              Terms of Service
            </a>
            <a href="/contact" className="mx-2 hover:text-blue-400">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
