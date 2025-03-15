import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { memo, useCallback } from "react";

const NavbarLink = memo(({ to, children, onClick }) => (
  <Link
    to={to}
    className="hover:text-blue-200 transition-colors duration-200"
    onClick={onClick}
  >
    {children}
  </Link>
));

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();
  // const [language, setLanguage] = useState("en");

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Click outside to close functionality
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className="bg-blue-600 text-white p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          {/* <img src="/logo.png" alt="Logo" className="h-8 mr-2" /> */}
          <span className="text-xl font-bold">Video2Audio</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/privacy" className="hover:text-blue-200">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-blue-200">
            Terms
          </Link>
          <Link to="/contact" className="hover:text-blue-200">
            Contact
          </Link>
          {/* <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent border-none text-white"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select> */}
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={buttonRef}
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg
              className="w-6 h-6 transition-transform transform rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 transition-transform transform rotate-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Links */}
      <div
        ref={menuRef}
        className={`md:hidden absolute w-full bg-blue-600 left-0 overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col space-y-4 px-4 pb-4">
          <Link
            to="/privacy"
            className="hover:text-blue-200 transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="hover:text-blue-200 transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Terms
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-200 transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
        // Update the mobile menu div with these attributes
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          className={`md:hidden absolute w-full bg-blue-600 left-0 overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        ></div>
      </div>
    </nav>
  );
}
