import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useTheme } from "../provider/ThemeProvider";
import { MdEdit, MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: 'ease-in-out-quad',
      once: true,
    });
  }, []);

  useEffect(() => {
    if (user?.email) {
      setUserData({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        metadata: user.metadata,
      });
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <span className="loading loading-spinner loading-lg text-cyan-500"></span>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">No user data found</h2>
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 py-12 transition-colors duration-300">
      {/* Back Button */}
      <div className="w-11/12 lg:w-5/6 mx-auto mb-8">
        <Link to="/" className="btn btn-ghost btn-sm gap-2 text-gray-700 dark:text-gray-300">
          <MdArrowBack /> Back to Home
        </Link>
      </div>

      <div className="w-11/12 lg:w-5/6 mx-auto" data-aos="fade-up">
        {/* Profile Header Card */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl p-8 lg:p-12 mb-12 border border-cyan-200 dark:border-cyan-800">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0" data-aos="zoom-in">
              <img
                src={userData.photoURL}
                alt={userData.displayName}
                className="w-32 h-32 lg:w-48 lg:h-48 rounded-full border-4 border-cyan-500 object-cover shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 mb-3">
                {userData.displayName}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                <span className="font-semibold text-gray-800 dark:text-gray-200">Email: </span>
                {userData.email}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                <span className="font-semibold text-gray-700 dark:text-gray-300">User ID: </span>
                {userData.uid.substring(0, 20)}...
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" data-aos="fade-up">
          {[
            { label: "Account Status", value: "Active", icon: "✓" },
            { label: "Member Since", value: new Date(userData.metadata?.creationTime).toLocaleDateString(), icon: "📅" },
            { label: "Last Sign In", value: new Date(userData.metadata?.lastSignInTime).toLocaleDateString(), icon: "⏰" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 transform hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
                {stat.label}
              </p>
              <p className="text-xl font-bold text-gray-800 dark:text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Profile Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg"
            data-aos="fade-up"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <span className="text-cyan-500">📧</span> Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Email Address
                </label>
                <p className="text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  {userData.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Display Name
                </label>
                <p className="text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  {userData.displayName}
                </p>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <span className="text-cyan-500">⚙️</span> Account Settings
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Manage your account preferences and settings
              </p>
              <button className="w-full btn btn-outline btn-cyan flex items-center justify-center gap-2 hover:btn-cyan dark:hover:bg-cyan-600 dark:border-cyan-600">
                <MdEdit /> Edit Profile
              </button>
              <button className="w-full btn btn-outline flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div
          className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800"
          data-aos="fade-up"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            📋 Account Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-gray-600 dark:text-gray-400 font-semibold mb-1">Account Created</p>
              <p className="text-gray-800 dark:text-gray-200">
                {new Date(userData.metadata?.creationTime).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 font-semibold mb-1">Last Updated</p>
              <p className="text-gray-800 dark:text-gray-200">
                {new Date(userData.metadata?.lastSignInTime).toLocaleString()}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-600 dark:text-gray-400 font-semibold mb-1">User ID</p>
              <p className="text-gray-800 dark:text-gray-200 break-all font-mono text-xs">
                {userData.uid}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
