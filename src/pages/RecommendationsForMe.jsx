import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import RecommendationCard from "../components/RecommendationCard";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import useAxiosSecure from "../hooks/useAxiosSecure";
import noData from "../assets/no-data.jpg";

const RecommendationsForMe = () => {
  const { user } = useContext(AuthContext);
  const [queries, setQueries] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/queries/${user?.email}`).then((res) => {
      setQueries(res.data);
    });
  }, [user?.email, axiosSecure]);

  return (
    <div>
      {queries.length > 0 ? (
        <div className="mt-10">
          {queries.map((query) => (
            <RecommendationCard
              key={query._id}
              query={query}
            ></RecommendationCard>
          ))}
        </div>
      ) : (
        <div className="space-y-5 text-center mt-20">
          <h1 className="text-4xl font-bold">No Query Available</h1>
          <img src={noData} className="h-96 w-96 mx-auto" alt="" />
          <Link
            to={"/add-queries"}
            className="btn btn-lg px-3 py-1  text-blue-600 bg-blue-100  "
          >
            <IoMdAdd />
            Post Your Queries
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecommendationsForMe;
