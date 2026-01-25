import axios from "axios";
import { useEffect, useState } from "react";
import { FcQuestions, FcSearch } from "react-icons/fc";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

const Find = () => {
  const [queries, setQueries] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: 'ease-in-out-quad',
      once: true,
    });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/queries`)
      .then((res) => setQueries(res.data));
    axios
      .get(`http://localhost:3000/recommendations`)
      .then((res) => setRecommendations(res.data));
  }, []);
  return (
    <div data-aos="fade-up" className="py-10">
      <div className="relative flex items-center justify-around gap-10 w-11/12 lg:w-1/3 rounded-2xl mx-auto mt-20 p-10 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-2xl hover:shadow-blue-200 transition-all duration-500 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="space-y-3 relative z-10">
          <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">{queries.length}+</h1>
          <p className="text-lg text-gray-600 font-semibold">Total Queries</p>
        </div>
        <div className="w-px h-16 bg-gradient-to-b from-blue-300 to-cyan-300"></div>
        <div className="space-y-3 relative z-10">
          <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
            {recommendations.length}+
          </h1>
          <p className="text-lg text-gray-600 font-semibold">Recommendations</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full lg:w-5/6 mx-auto gap-5 lg:gap-10 mt-10">
        <div className="group flex items-center justify-center gap-10 w-11/12 lg:w-1/2 rounded-2xl mx-auto p-10 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl hover:shadow-2xl hover:shadow-blue-300 transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden" data-aos="fade-right">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-indigo-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <FcSearch className="text-7xl group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="space-y-3 relative z-10">
            <p className="text-lg text-gray-600 font-medium">
              Find the best answer to your technical question, help others
              answer theirs
            </p>
            <Link to={"/all-queries"} className="btn btn-info bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600 text-white font-semibold transition-all duration-300 hover:shadow-lg">
              Browse Queries
            </Link>
          </div>
        </div>
        <div className="group flex items-center justify-center gap-10 w-11/12 lg:w-1/2 rounded-2xl mx-auto p-10 bg-gradient-to-br from-orange-50 to-amber-50 shadow-xl hover:shadow-2xl hover:shadow-orange-300 transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden" data-aos="fade-left">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <FcQuestions className="text-7xl group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="space-y-3 relative z-10">
            <p className="text-lg text-gray-600 font-medium">
              Share your questions and get recommendations from experts
            </p>
            <Link to={"/add-queries"} className="btn btn-accent bg-orange-500 border-orange-500 hover:bg-orange-600 hover:border-orange-600 text-white font-semibold transition-all duration-300 hover:shadow-lg">
              Add Queries
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Find;
