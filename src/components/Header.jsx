import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logos.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center ml-8">
            <img src={logo} alt="Dhaqaaleeye Logo" className="h-14 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 mr-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-[#800000] transition-colors duration-300 text-base font-medium"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-[#800000] transition-colors duration-300 text-base font-medium"
            >
              About
            </Link>
            <Link
              to="/login"
              className="text-[#800000] hover:text-[#600000] transition-colors duration-300 text-base font-medium px-4 py-2"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-[#800000] text-white px-6 py-2.5 rounded-lg hover:bg-[#600000] transition-colors duration-300 text-base font-medium shadow-sm hover:shadow-md"
            >
              Sign Up
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 mr-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="px-4 py-3 space-y-3">
              <Link
                to="/"
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-[#800000] hover:bg-gray-50 rounded-lg transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-[#800000] hover:bg-gray-50 rounded-lg transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/login"
                className="block px-4 py-2 text-base font-medium text-[#800000] hover:text-[#600000] hover:bg-gray-50 rounded-lg transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 text-base font-medium text-white bg-[#800000] hover:bg-[#600000] rounded-lg transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 