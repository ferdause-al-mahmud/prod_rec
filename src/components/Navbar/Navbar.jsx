import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { MdLogin, MdLogout } from "react-icons/md";
import { AuthContext } from "../../provider/AuthProvider";
import { useContext } from "react";
import toast from "react-hot-toast";
import { FcMenu } from "react-icons/fc";
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
    <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 text-base font-medium">
      <NavLink to={"/"} className="hover:text-lg ease-in-out duration-100">
        Home
      </NavLink>
      <NavLink
        to={"/all-queries"}
        className="hover:text-lg ease-in-out duration-100"
      >
        All Queries
      </NavLink>
      <Link
        to={"/login"}
        className={`btn btn-md lg:hidden text-base bg-[#00c1a2] text-white hover:bg-[#00a896] ${
          user?.email ? "hidden" : "flex"
        }`}
      >
        <MdLogin /> Login
      </Link>
      {user?.email ? (
        <>
          <NavLink
            to={"/recommendation-for-me"}
            className="hover:text-lg ease-in-out duration-100"
          >
            Recommendation for Me
          </NavLink>
          <NavLink
            to={"/my-queries"}
            className="hover:text-lg ease-in-out duration-100"
          >
            My Queries
          </NavLink>
          <NavLink
            to={"/my-recommendations"}
            className="hover:text-lg ease-in-out duration-100"
          >
            My Recommendations
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex lg:hidden btn btn-md  text-base bg-[#ef476f] text-white hover:bg-[#d62246]"
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
    <div className=" bg-white py-2 shadow-lg sticky top-0 z-50">
      <div className="navbar w-5/6 mx-auto">
        <div className="navbar-start">
          <img src={logo} className="w-10 h-10 mr-1" alt="" />
          <a className="font-bold  text-3xl">ProdRec</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user?.email ? (
            <div className="flex items-center gap-4 ">
              <div className="dropdown dropdown-end  lg:hidden">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar "
                >
                  <img
                    src={user?.photoURL}
                    className="rounded-full object-cover"
                    alt=""
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-lg z-[1] mt-3 w-60 p-5 shadow"
                >
                  <div className="my-2">
                    <h1 className="font-bold">{user?.displayName}</h1>
                    <p>{user?.email}</p>
                    <div className="divider my-0"></div>
                  </div>

                  {links}
                </ul>
              </div>
              <img
                data-tooltip-id="my-tooltip"
                src={user?.photoURL}
                className="w-10 h-10 hidden lg:flex rounded-full object-cover"
                alt=""
              />
              <Tooltip id="my-tooltip">
                <div className="text-center">
                  <h1>{user?.displayName}</h1>
                  <p>{user?.email}</p>
                </div>
              </Tooltip>
              <button
                onClick={handleLogout}
                className="hidden lg:flex btn btn-md  text-base bg-[#ef476f] text-white hover:bg-[#d62246]"
              >
                <MdLogout></MdLogout> Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4 ">
              <div className="dropdown dropdown-end  lg:hidden">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-sm md:btn-md btn-circle border-2 border-green-400  "
                >
                  <FcMenu className="font-bold text-xl shadow-2xl" />
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  {links}
                </ul>
              </div>
              <Link
                to={"/login"}
                className="btn btn-md hidden lg:flex text-base bg-[#00c1a2] text-white hover:bg-[#00a896]"
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
