import React, { useState, useEffect } from "react";

export default function SimpleNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileMenuButton = document.querySelector(".mobile-menu-button");
      const mobileMenu = document.querySelector(".mobile-menu");

      if (
        mobileMenuButton &&
        mobileMenu &&
        !mobileMenuButton.contains(event.target) &&
        !mobileMenu.contains(event.target)
      ) {
        closeMobileMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Close mobile menu on window resize (when switching to desktop view)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // md breakpoint in Tailwind
        closeMobileMenu();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <a href="#" className="text-xl font-semibold text-gray-900">
                Brand
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#"
                  className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Services
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="mobile-menu-button bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon */}
                <svg
                  className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* Close icon */}
                <svg
                  className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`mobile-menu ${
            isMobileMenuOpen ? "block" : "hidden"
          } md:hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <a
              href="#"
              className="text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={closeMobileMenu}
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              onClick={closeMobileMenu}
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              onClick={closeMobileMenu}
            >
              Services
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              onClick={closeMobileMenu}
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Demo content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Simple Responsive Navbar - React
          </h1>
          <p className="text-gray-600">
            This is a clean, simple navbar built with React hooks (useState and
            useEffect). Try resizing your browser window to see the mobile menu
            in action.
          </p>
        </div>
      </div>
    </div>
  );
}
