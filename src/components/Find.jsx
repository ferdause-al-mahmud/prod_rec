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
    Aos.init();
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/queries`)
      .then((res) => setQueries(res.data));
    axios
      .get(`http://localhost:5000/recommendations`)
      .then((res) => setRecommendations(res.data));
  }, []);
  return (
    <div data-aos="fade-up">
      <div className="flex items-center justify-around gap-10 w-11/12 lg:w-1/3 rounded-lg mx-auto mt-20 p-10 shadow-xl">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-center">{queries.length}+</h1>
          <p className="text-lg text-gray-500">Total Queries</p>
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-center">
            {recommendations.length}+
          </h1>
          <p className="text-lg text-gray-500">Recommendations</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full lg:w-5/6 mx-auto gap-5 lg:gap-10">
        {" "}
        <div className="flex items-center justify-center gap-10 w-11/12 lg:w-1/2 rounded-lg mx-auto mt-10 p-10 shadow-xl">
          <div>
            <FcSearch className="text-7xl" />
          </div>
          <div className="space-y-3">
            <p className="text-lg text-gray-500">
              Find the best answer to your technical question, help others
              answer theirs
            </p>
            <Link to={"/all-queries"} className="btn btn-info">
              Browse Queries
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center gap-10 w-11/12 lg:w-1/2 rounded-lg mx-auto mt-10 p-10 shadow-xl">
          <div>
            <FcQuestions className="text-7xl" />
          </div>
          <div className="space-y-3">
            <p className="text-lg text-gray-500">
              Find the best answer to your technical question, help others
              answer theirs
            </p>
            <Link to={"/add-queries"} className="btn btn-accent">
              Add Queries
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Find;
