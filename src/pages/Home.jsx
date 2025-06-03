import { Link } from 'react-router-dom';
import Header from '../components/Header';
import logo from '../assets/logos.png';

const Home = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white pt-16">
        {/* Hero Section */}
        <section className="relative bg-[#912c2c] text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute transform rotate-45 -translate-y-1/2 -translate-x-1/2" style={{ top: '50%', left: '50%' }}>
              <div className="w-[800px] h-[800px] border-2 border-white rounded-full"></div>
              <div className="absolute inset-0 w-[600px] h-[600px] border-2 border-white rounded-full m-auto"></div>
              <div className="absolute inset-0 w-[400px] h-[400px] border-2 border-white rounded-full m-auto"></div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-20 md:py-32 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Text Content */}
              <div className="text-center lg:text-left space-y-8">
                <h1 className="text-4xl text-white md:text-6xl font-bold leading-tight">
                  Dhaqaaleeye – Xalka Xisaabtada Maalinlaha ah
                </h1>
                <p className="text-xl md:text-2xl opacity-90">
                  Maamul dakhligaaga iyo kharashaadkaaga si fudud oo hufan.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    to="/signup"
                    className="inline-block bg-white text-[#800000] font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition duration-300 text-lg"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/about"
                    className="inline-block border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white/10 transition duration-300 text-lg"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Right side - Image */}
              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-gray-100 rounded-3xl transform rotate-6"></div>
                <img
                  src={logo}
                  alt="Dhaqaaleeye App"
                  className="relative rounded-3xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section - What is Dhaqaaleeye */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  What is <span className="text-[#800000]">Dhaqaaleeye</span>?
                </h2>
                <div className="w-24 h-1 bg-[#800000] mx-auto mb-8"></div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Dhaqaaleeye is a user-friendly web application designed to help you manage your personal finances effectively. 
                  Track your income and expenses easily, and take control of your financial journey with our intuitive tools.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-14 h-14 bg-[#800000]/10 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-[#800000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Easy Money Management</h3>
                  <p className="text-gray-600">
                    Simplify your financial tracking with our intuitive interface. Monitor your income and expenses effortlessly.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-14 h-14 bg-[#800000]/10 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-[#800000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Analytics</h3>
                  <p className="text-gray-600">
                    Get detailed insights into your spending patterns with visual reports and analytics.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-14 h-14 bg-[#800000]/10 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-[#800000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Secure & Private</h3>
                  <p className="text-gray-600">
                    Your financial data is protected with industry-standard security measures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Income Feature */}
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-[#800000] mb-2">
                  Income Tracking
                </h3>
                <p className="text-gray-600">
                  Easily record and monitor all your income sources
                </p>
              </div>

              {/* Expenses Feature */}
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">💸</div>
                <h3 className="text-xl font-bold text-[#800000] mb-2">
                  Daily Expenses
                </h3>
                <p className="text-gray-600">
                  Keep track of your daily spending habits
                </p>
              </div>

              {/* Reporting Feature */}
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-[#800000] mb-2">
                  Clear Reports
                </h3>
                <p className="text-gray-600">
                  Get detailed insights into your financial activities
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 bg-[#800000]/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  How It <span className="text-[#800000]">Works</span>
                </h2>
                <div className="w-24 h-1 bg-[#800000] mx-auto mb-8"></div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Get started with Dhaqaaleeye in three simple steps and take control of your finances today.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#800000]/20"></div>

                {/* Step 1 */}
                <div className="relative">
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center relative z-10">
                    <div className="w-16 h-16 bg-[#800000] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                      1
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Create Account</h3>
                    <p className="text-gray-600">
                      Sign up for free and set up your personal profile in less than 2 minutes.
                    </p>
                  </div>
                  <div className="hidden md:block absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rotate-45 bg-white border-r border-b border-gray-100"></div>
                </div>

                {/* Step 2 */}
                <div className="relative mt-8 md:mt-0">
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center relative z-10">
                    <div className="w-16 h-16 bg-[#800000] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                      2
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Add Transactions</h3>
                    <p className="text-gray-600">
                      Record your income and expenses easily with our intuitive interface.
                    </p>
                  </div>
                  <div className="hidden md:block absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rotate-45 bg-white border-r border-b border-gray-100"></div>
                </div>

                {/* Step 3 */}
                <div className="relative mt-8 md:mt-0">
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center relative z-10">
                    <div className="w-16 h-16 bg-[#800000] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                      3
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Track Progress</h3>
                    <p className="text-gray-600">
                      Monitor your financial health with detailed reports and insights.
                    </p>
                  </div>
                  <div className="hidden md:block absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rotate-45 bg-white border-r border-b border-gray-100"></div>
                </div>
              </div>

              <div className="text-center mt-16">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-[#800000] rounded-xl hover:bg-[#600000] transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Started Now
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* New Modern Footer */}
        <footer className="bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4">
            {/* Top Footer Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
              {/* Brand Section */}
              <div className="space-y-4">
                <img src={logo} alt="Dhaqaaleeye" className="h-16 w-auto" />
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

export default Home; 