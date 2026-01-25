import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { MdLogin, MdLogout } from "react-icons/md";
import { AuthContext } from "../../provider/AuthProvider";
import { useTheme } from "../../provider/ThemeProvider";
import { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FcMenu } from "react-icons/fc";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { BsCloudDrizzle, BsCloudRain, BsCloudSnow, BsSun, BsCloud } from "react-icons/bs";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const [dateTime, setDateTime] = useState("");
  const [weather, setWeather] = useState({ temp: null, condition: "", code: null, location: "" });
  const notify = () => toast.error("Logout Successfully");

  // Update date and time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = { 
        weekday: "short", 
        year: "numeric", 
        month: "short", 
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      };
      setDateTime(now.toLocaleDateString("en-US", options));
    };
    
    updateDateTime();
    const timer = setInterval(updateDateTime, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  // Fetch weather data using Open-Meteo API (free, no API key needed)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Get user's location (using IP geolocation with free service)
        const geoResponse = await fetch("https://ipapi.co/json/");
        const geoData = await geoResponse.json();
        const { latitude, longitude, city, country_name } = geoData;

        console.log("Geo Data:", geoData);

        // Fetch weather data
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=celsius`
        );
        const weatherData = await weatherResponse.json();
        const current = weatherData.current;
        
        // Map WMO weather codes to conditions
        const getWeatherCondition = (code) => {
          if (code === 0 || code === 1) return "Clear";
          if (code === 2) return "Cloudy";
          if (code === 3) return "Overcast";
          if (code >= 45 && code <= 48) return "Foggy";
          if (code >= 51 && code <= 67) return "Drizzle";
          if (code >= 80 && code <= 82) return "Rainy";
          if (code >= 85 && code <= 86) return "Showers";
          if (code >= 71 && code <= 77) return "Snow";
          return "Fair";
        };

        const locationName = city ? city : (country_name || "Your Location");

        console.log("Location Name:", locationName);

        setWeather({
          temp: Math.round(current.temperature_2m),
          condition: getWeatherCondition(current.weather_code),
          code: current.weather_code,
          location: locationName
        });
      } catch (error) {
        console.error("Weather fetch error:", error);
        setWeather({ temp: 25, condition: "Fair", code: 0, location: "Earth" });
      }
    };

    fetchWeather();
  }, []);

  // Get weather icon based on condition
  const getWeatherIcon = (code) => {
    if (code === 0 || code === 1) return <BsSun className="text-yellow-400" />;
    if (code === 2 || code === 3) return <BsCloud className="text-gray-400" />;
    if (code >= 45 && code <= 48) return <BsCloud className="text-gray-500" />;
    if (code >= 51 && code <= 67) return <BsCloudDrizzle className="text-blue-400" />;
    if (code >= 80 && code <= 82) return <BsCloudRain className="text-blue-500" />;
    if (code >= 71 && code <= 77) return <BsCloudSnow className="text-cyan-400" />;
    return <BsCloud className="text-gray-400" />;
  };

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
                    
                    {/* Date and Weather */}
                    <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600 space-y-2">
                      <p className="text-xs text-gray-600 dark:text-gray-300">{dateTime}</p>
                      {weather.temp !== null && weather.condition && (
                        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-2">
                          <div className="text-lg">
                            {getWeatherIcon(weather.code)}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                              {weather.location}
                            </p>
                            <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                              {weather.temp}°C
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {links}

                  {/* Profile Button - Mobile */}
                  <li className="my-2 border-t border-gray-200 dark:border-gray-700 pt-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors duration-300 text-cyan-600 dark:text-cyan-400 font-medium"
                    >
                      <MdPerson className="text-xl" />
                      View Profile
                    </Link>
                  </li>

                  {/* Theme Toggle - Mobile */}
                  <li className="my-2">
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

                  {/* Logout Button - Mobile
                  <li className="my-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-[#ef476f] to-[#d62246] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                    >
                      <MdLogout className="text-xl" />
                      Logout
                    </button>
                  </li> */}
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
                    
                    {/* Date and Weather */}
                    <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600 space-y-2">
                      <p className="text-xs text-gray-600 dark:text-gray-300">{dateTime}</p>
                      {weather.temp !== null && weather.condition && (
                        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-2">
                          <div className="text-lg">
                            {getWeatherIcon(weather.code)}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                              {weather.location}
                            </p>
                            <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                              {weather.temp}°C
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Profile Button */}
                  <li className="my-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors duration-300 text-cyan-600 dark:text-cyan-400 font-medium"
                    >
                      <MdPerson className="text-xl" />
                      View Profile
                    </Link>
                  </li>

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
