import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { MdLogin, MdLogout } from "react-icons/md";
import { AuthContext } from "../../provider/AuthProvider";
import { useTheme } from "../../provider/ThemeProvider";
import { useContext } from "react";
import toast from "react-hot-toast";
import { FcMenu } from "react-icons/fc";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const notify = () => toast.error("Logout Successfully");

  const handleLogout = () => {
    logoutUser().then(() => {
      notify();
    });
  };

  const links = (
    <div className="flex flex-col lg:flex-row gap-3 lg:gap-2 text-base font-medium">
      <NavLink to={"/"} className="nav-link">
        Home
      </NavLink>
      <NavLink
        to={"/all-queries"}
        className="nav-link"
      >
        All Queries
      </NavLink>
      <Link
        to={"/login"}
        className={`btn btn-sm lg:hidden text-sm bg-gradient-to-r from-[#00c1a2] to-[#00a896] text-white border-none hover:shadow-lg transition-all duration-300 ${
          user?.email ? "hidden" : "flex"
        }`}
      >
        <MdLogin /> Login
      </Link>
      {user?.email ? (
        <>
          <NavLink
            to={"/recommendation-for-me"}
            className="nav-link"
          >
            Recommendation for Me
          </NavLink>
          <NavLink
            to={"/my-queries"}
            className="nav-link"
          >
            My Queries
          </NavLink>
          <NavLink
            to={"/my-recommendations"}
            className="nav-link"
          >
            My Recommendations
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex lg:hidden btn btn-sm text-sm bg-gradient-to-r from-[#ef476f] to-[#d62246] text-white border-none hover:shadow-lg transition-all duration-300"
          >
            <MdLogout></MdLogout> Logout
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );

  return (
    <div className="navbar-wrapper bg-white dark:bg-gray-900 py-3 shadow-lg sticky top-0 z-50 border-b-2 border-gradient transition-colors duration-300">
      <div className="navbar w-11/12 lg:w-11/12 mx-auto px-0">
        <div className="navbar-start">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300">
            <img src={logo} className="w-10 h-10" alt="ProdRec Logo" />
            <a className="font-bold text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#00c1a2] to-[#0088cc]">
              ProdRec
            </a>
          </Link>
        </div>
        <div className="navbar-center px-10 hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
        </div>
        <div className="navbar-end">
          {user?.email ? (
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Mobile dropdown menu */}
              <div className="dropdown dropdown-end lg:hidden">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar w-10 h-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  <img
                    src={user?.photoURL}
                    className="rounded-full object-cover border-2 border-[#00c1a2]"
                    alt="User Avatar"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-xl z-[1] mt-3 w-64 p-4 shadow-2xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="my-3 px-2 border-b border-gray-200 dark:border-gray-700 pb-3">
                    <h1 className="font-bold text-gray-800 dark:text-white">{user?.displayName}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>

                  {links}
                </ul>
              </div>

              {/* Desktop dropdown menu */}
              <div className="dropdown dropdown-end hidden lg:block">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar w-12 h-12 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 border-2 border-[#00c1a2]"
                >
                  <img
                    src={user?.photoURL}
                    className="rounded-full object-cover"
                    alt="User Avatar"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content bg-white dark:bg-gray-800 rounded-xl z-[1] mt-3 w-80 p-4 shadow-2xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="my-3 px-2 border-b border-gray-200 dark:border-gray-700 pb-3">
                    <h1 className="font-bold text-lg text-gray-800 dark:text-white">{user?.displayName}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>

                  {/* Theme Toggle */}
                  <li className="my-2">
                    <button
                      onClick={toggleTheme}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                    >
                      {theme === "light" ? (
                        <>
                          <MdDarkMode className="text-xl text-gray-700 dark:text-gray-300" />
                          <span className="text-gray-800 dark:text-white font-medium">Dark Mode</span>
                        </>
                      ) : (
                        <>
                          <MdLightMode className="text-xl text-yellow-500" />
                          <span className="text-gray-800 dark:text-white font-medium">Light Mode</span>
                        </>
                      )}
                    </button>
                  </li>

                  {/* Logout Button */}
                  <li className="my-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-[#ef476f] to-[#d62246] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                    >
                      <MdLogout className="text-xl" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Mobile menu for not logged in */}
              <div className="dropdown dropdown-end lg:hidden">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-sm btn-ghost btn-circle border-2 border-gradient-to-r from-[#00c1a2] to-[#0088cc] hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  <FcMenu className="text-xl" />
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-xl z-[1] mt-3 w-56 p-4 shadow-2xl border border-gray-200 dark:border-gray-700"
                >
                  {links}

                  {/* Theme toggle for mobile not logged in */}
                  <li className="my-2 border-t border-gray-200 dark:border-gray-700 pt-2">
                    <button
                      onClick={toggleTheme}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                    >
                      {theme === "light" ? (
                        <>
                          <MdDarkMode className="text-xl text-gray-700 dark:text-gray-300" />
                          <span className="text-gray-800 dark:text-white font-medium">Dark</span>
                        </>
                      ) : (
                        <>
                          <MdLightMode className="text-xl text-yellow-500" />
                          <span className="text-gray-800 dark:text-white font-medium">Light</span>
                        </>
                      )}
                    </button>
                  </li>
                </ul>
              </div>

              {/* Desktop login button for not logged in */}
              <Link
                to={"/login"}
                className="btn btn-sm hidden lg:flex text-sm bg-gradient-to-r from-[#00c1a2] to-[#00a896] text-white border-none hover:shadow-lg transition-all duration-300"
              >
                <MdLogin /> Login
              </Link>

              {/* Desktop theme toggle for not logged in */}
              <button
                onClick={toggleTheme}
                className="btn btn-sm btn-ghost hidden lg:flex text-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                title="Toggle theme"
              >
                {theme === "light" ? (
                  <MdDarkMode className="text-gray-700" />
                ) : (
                  <MdLightMode className="text-yellow-500" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
