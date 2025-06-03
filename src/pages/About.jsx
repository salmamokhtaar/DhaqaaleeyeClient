import { Link } from 'react-router-dom';
import Header from '../components/Header';
import aboutImage from '../assets/logos.png';
import logo from '../assets/logos.png';

const About = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white pt-16">
        {/* Main About Section */}
        <section className="py-16 px-4 md:px-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Text Content */}
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-[#800000] mb-6">
                  About Dhaqaaleeye
                </h1>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Dhaqaaleeye is more than just a financial tracking app - it's your personal financial companion. 
                  We understand the importance of managing your money effectively, which is why we've created 
                  a platform that makes financial management accessible and straightforward for everyone.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our platform provides comprehensive tools for tracking both income and expenses, 
                  giving you a clear picture of your financial health. Whether you're saving for a 
                  specific goal or just want to better understand your spending habits, Dhaqaaleeye 
                  is here to help you make informed financial decisions.
                </p>
                <div className="pt-4">
                  <Link
                    to="/signup"
                    className="inline-block bg-[#800000] text-white px-8 py-3 rounded-lg hover:bg-[#600000] transition duration-300"
                  >
                    Join Dhaqaaleeye Today
                  </Link>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="relative">
                <div className="bg-[#800000] absolute inset-0 rounded-3xl opacity-10 transform rotate-3"></div>
                <img
                  src={aboutImage}
                  alt="Dhaqaaleeye App Interface"
                  className="relative rounded-3xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Cards */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Vision Card */}
              <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-1 transition duration-300">
                <div className="text-4xl mb-4 text-[#800000]">👁️</div>
                <h2 className="text-2xl font-bold text-[#800000] mb-4">Our Vision</h2>
                <p className="text-gray-700 leading-relaxed">
                  To become the leading personal finance management platform, empowering 
                  individuals to achieve financial freedom through better money management 
                  and informed decision-making.
                </p>
              </div>

              {/* Mission Card */}
              <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-1 transition duration-300">
                <div className="text-4xl mb-4 text-[#800000]">🎯</div>
                <h2 className="text-2xl font-bold text-[#800000] mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                  To provide user-friendly, accessible financial management tools that help 
                  people track, understand, and improve their financial health while making 
                  the process simple and engaging.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Active Users Card */}
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="text-4xl font-bold text-[#800000] mb-2">5,000+</div>
                <p className="text-gray-600">Active Users</p>
              </div>

              {/* Transactions Card */}
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="text-4xl font-bold text-[#800000] mb-2">100K+</div>
                <p className="text-gray-600">Transactions Tracked</p>
              </div>

              {/* User Satisfaction Card */}
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="text-4xl font-bold text-[#800000] mb-2">98%</div>
                <p className="text-gray-600">User Satisfaction</p>
              </div>

              {/* Countries Card */}
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="text-4xl font-bold text-[#800000] mb-2">10+</div>
                <p className="text-gray-600">Countries Served</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4">
            {/* Top Footer Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
              {/* Brand Section */}
              <div className="space-y-4">
                <img src={logo} alt="Dhaqaaleeye" className="h-10 w-auto" />
                <p className="text-gray-600">
                  Your trusted companion for personal finance management.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-gray-900 font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-600 hover:text-[#800000] transition duration-300">Home</Link></li>
                  <li><Link to="/about" className="text-gray-600 hover:text-[#800000] transition duration-300">About</Link></li>
                  <li><Link to="/login" className="text-gray-600 hover:text-[#800000] transition duration-300">Login</Link></li>
                  <li><Link to="/signup" className="text-gray-600 hover:text-[#800000] transition duration-300">Sign Up</Link></li>
                </ul>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-gray-900 font-bold mb-4">Features</h3>
                <ul className="space-y-2">
                  <li className="text-gray-600">Income Tracking</li>
                  <li className="text-gray-600">Expense Management</li>
                  <li className="text-gray-600">Financial Reports</li>
                  <li className="text-gray-600">Budget Planning</li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-gray-900 font-bold mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li className="text-gray-600">support@dhaqaaleeye.com</li>
                  <li className="text-gray-600">+1 (555) 123-4567</li>
                </ul>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-200 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-600 text-sm">
                  © 2025 Dhaqaaleeye. All rights reserved.
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <a href="#" className="text-gray-600 hover:text-[#800000] transition duration-300">Privacy Policy</a>
                  <a href="#" className="text-gray-600 hover:text-[#800000] transition duration-300">Terms of Service</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default About; 