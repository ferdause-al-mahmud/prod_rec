import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { MdLogin, MdLogout } from "react-icons/md";
import { AuthContext } from "../../provider/AuthProvider";
import { useContext } from "react";
import toast from "react-hot-toast";
import { FcMenu } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const notify = () => toast.error("Logout Successfully");

  const handleLogout = () => {
    logoutUser().then(() => {
      // console.log("user logged out");
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
    <div className="navbar-wrapper bg-white py-3 shadow-lg sticky top-0 z-50 border-b-2 border-gradient">
      <div className="navbar w-11/12 lg:w-full mx-auto px-0">
        <div className="navbar-start">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300">
            <img src={logo} className="w-10 h-10" alt="ProdRec Logo" />
            <a className="font-bold text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#00c1a2] to-[#0088cc]">
              ProdRec
            </a>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
        </div>
        <div className="navbar-end">
          {user?.email ? (
            <div className="flex items-center gap-2 lg:gap-4">
              <div className="dropdown dropdown-end lg:hidden">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar w-10 h-10 hover:bg-gray-100 transition-colors duration-300"
                >
                  <img
                    src={user?.photoURL}
                    className="rounded-full object-cover border-2 border-[#00c1a2]"
                    alt="User Avatar"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white rounded-xl z-[1] mt-3 w-64 p-4 shadow-2xl border border-gray-200"
                >
                  <div className="my-3 px-2 border-b border-gray-200 pb-3">
                    <h1 className="font-bold text-gray-800">{user?.displayName}</h1>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>

                  {links}
                </ul>
              </div>
              <img
                data-tooltip-id="my-tooltip"
                src={user?.photoURL}
                className="w-10 h-10 hidden lg:flex rounded-full object-cover border-2 border-[#00c1a2] cursor-pointer hover:border-[#0088cc] transition-colors duration-300"
                alt="User Avatar"
              />
              <Tooltip id="my-tooltip" className="custom-tooltip">
                <div className="text-center">
                  <h1 className="font-bold">{user?.displayName}</h1>
                  <p className="text-sm">{user?.email}</p>
                </div>
              </Tooltip>
              <button
                onClick={handleLogout}
                className="hidden lg:flex btn btn-sm text-sm bg-gradient-to-r from-[#ef476f] to-[#d62246] text-white border-none hover:shadow-lg transition-all duration-300"
              >
                <MdLogout></MdLogout> Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 lg:gap-4">
              <div className="dropdown dropdown-end lg:hidden">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-sm btn-ghost btn-circle border-2 border-gradient-to-r from-[#00c1a2] to-[#0088cc] hover:bg-gray-100 transition-colors duration-300"
                >
                  <FcMenu className="text-xl" />
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white rounded-xl z-[1] mt-3 w-56 p-4 shadow-2xl border border-gray-200"
                >
                  {links}
                </ul>
              </div>
              <Link
                to={"/login"}
                className="btn btn-sm hidden lg:flex text-sm bg-gradient-to-r from-[#00c1a2] to-[#00a896] text-white border-none hover:shadow-lg transition-all duration-300"
              >
                <MdLogin /> Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
