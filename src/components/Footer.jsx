import logo from "../assets/logo.png";
import { FaTwitter, FaYoutube, FaFacebook, FaLinkedin } from "react-icons/fa";
import { useTheme } from "../provider/ThemeProvider";

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${theme === "dark" ? "bg-gradient-to-b from-gray-900 via-slate-900 to-black" : "bg-gradient-to-b from-gray-100 via-gray-50 to-white"} transition-colors duration-300 mt-16 lg:mt-24 border-t ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
      {/* Main Footer Content */}
      <div className="w-11/12 lg:w-5/6 mx-auto py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} className="w-12 h-12 hover:scale-110 transition-transform duration-300" alt="ProdRec Logo" />
              <div>
                <h2 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#00c1a2] to-[#0088cc]">
                  ProdRec
                </h2>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Find the right product, instantly
                </p>
              </div>
            </div>
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-700"} leading-relaxed text-sm mb-6`}>
              Your trusted platform for product recommendations and expert advice. Making informed decisions simple.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600" : "bg-gray-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500"} transition-all duration-300 group`}>
                <FaTwitter className={`text-lg ${theme === "dark" ? "text-gray-400 group-hover:text-white" : "text-gray-700 group-hover:text-white"}`} />
              </a>
              <a href="#" className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-800 hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-600" : "bg-gray-200 hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500"} transition-all duration-300 group`}>
                <FaYoutube className={`text-lg ${theme === "dark" ? "text-gray-400 group-hover:text-white" : "text-gray-700 group-hover:text-white"}`} />
              </a>
              <a href="#" className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-600" : "bg-gray-200 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500"} transition-all duration-300 group`}>
                <FaFacebook className={`text-lg ${theme === "dark" ? "text-gray-400 group-hover:text-white" : "text-gray-700 group-hover:text-white"}`} />
              </a>
              <a href="#" className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-400" : "bg-gray-200 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500"} transition-all duration-300 group`}>
                <FaLinkedin className={`text-lg ${theme === "dark" ? "text-gray-400 group-hover:text-white" : "text-gray-700 group-hover:text-white"}`} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h6 className={`font-bold text-lg mb-5 ${theme === "dark" ? "text-[#00c1a2]" : "text-[#0088cc]"}`}>
              Services
            </h6>
            <ul className="space-y-3">
              <li><a href="#" className={`${theme === "dark" ? "text-gray-400 hover:text-[#00c1a2]" : "text-gray-700 hover:text-[#00c1a2]"} transition-colors duration-300 text-sm`}>Product Search</a></li>
              <li><a href="#" className={`${theme === "dark" ? "text-gray-400 hover:text-[#00c1a2]" : "text-gray-700 hover:text-[#00c1a2]"} transition-colors duration-300 text-sm`}>Recommendations</a></li>
              <li><a href="#" className={`${theme === "dark" ? "text-gray-400 hover:text-[#00c1a2]" : "text-gray-700 hover:text-[#00c1a2]"} transition-colors duration-300 text-sm`}>Expert Reviews</a></li>
              <li><a href="#" className={`${theme === "dark" ? "text-gray-400 hover:text-[#00c1a2]" : "text-gray-700 hover:text-[#00c1a2]"} transition-colors duration-300 text-sm`}>Comparisons</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h6 className={`font-bold text-lg mb-5 ${theme === "dark" ? "text-[#00c1a2]" : "text-[#0088cc]"}`}>
              Company
            </h6>
            <ul className="space-y-3">
              <li><a href="#" className={`${theme === "dark" ? "text-gray-400 hover:text-[#00c1a2]" : "text-gray-700 hover:text-[#00c1a2]"} transition-colors duration-300 text-sm`}>About Us</a></li>
              <li><a href="#" className={`${theme === "dark" ? "text-gray-400 hover:text-[#00c1a2]" : "text-gray-700 hover:text-[#00c1a2]"} transition-colors duration-300 text-sm`}>Blog</a></li>
              <li><a href="#" className={`${theme === "dark" ? "text-gray-400 hover:text-[#00c1a2]" : "text-gray-700 hover:text-[#00c1a2]"} transition-colors duration-300 text-sm`}>Careers</a></li>
              <li><a href="#" className={`${theme === "dark" ? "text-gray-400 hover:text-[#00c1a2]" : "text-gray-700 hover:text-[#00c1a2]"} transition-colors duration-300 text-sm`}>Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h6 className={`font-bold text-lg mb-5 ${theme === "dark" ? "text-[#00c1a2]" : "text-[#0088cc]"}`}>
              Legal
            </h6>
            <ul className="space-y-3">
              <li><a href="#" className={`${theme === "dark" ? "text-gray-400 hover:text-[#00c1a2]" : "text-gray-700 hover:text-[#00c1a2]"} transition-colors duration-300 text-sm`}>Terms of Use</a></li>
              <li><a href="#" className={`${theme === "dark" ? "text-gray-400 hover:text-[#00c1a2]" : "text-gray-700 hover:text-[#00c1a2]"} transition-colors duration-300 text-sm`}>Privacy Policy</a></li>
              <li><a href="#" className={`${theme === "dark" ? "text-gray-400 hover:text-[#00c1a2]" : "text-gray-700 hover:text-[#00c1a2]"} transition-colors duration-300 text-sm`}>Cookie Policy</a></li>
              <li><a href="#" className={`${theme === "dark" ? "text-gray-400 hover:text-[#00c1a2]" : "text-gray-700 hover:text-[#00c1a2]"} transition-colors duration-300 text-sm`}>Disclaimer</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className={`my-12 h-px ${theme === "dark" ? "bg-gradient-to-r from-transparent via-gray-700 to-transparent" : "bg-gradient-to-r from-transparent via-gray-300 to-transparent"}`}></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            © {currentYear} <span className="font-semibold text-[#00c1a2]">ProdRec</span>. All rights reserved.
          </p>
          <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Made with <span className="text-red-500">❤</span> by <span className="font-semibold text-[#00c1a2]">ProdRec Team</span>
          </div>
          <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-600"}`}>
            Connecting you with the perfect products
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
