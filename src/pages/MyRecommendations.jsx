import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyRecommendations = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/recommendations/user/${user?.email}`).then((res) => {
      setRecommendations(res.data);
    });
  }, [user?.email, axiosSecure]);

  const handleRecommendationDelete = (id, q_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/recommendations/${id}`)
          .then((res) => {
            // console.log(res.data);
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              const newRecommendations = recommendations.filter(
                (recommendation) => recommendation._id !== id,
              );
              setRecommendations(newRecommendations);

              axios
                .put(
                  `http://localhost:3000/decrease-recommendationCount/${q_id}`,
                )
                .then((res) => {
                  console.log(res.data);
                });
            }
          });
      }
    });
  };

  return (
    <div>
      {recommendations.length > 0 ? (
        <section className="w-5/6 px-4 mx-auto pt-12">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex  items-center gap-x-3">
              <h2 className="text-lg font-medium text-gray-800 ">
                My All Recommendations
              </h2>

              <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
                {recommendations.length} Recommendations
              </span>
            </div>

            <div className="flex items-center gap-x-3">
              <Link
                to={"/all-queries"}
                className="btn px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full "
              >
                <IoMdAdd />
                Give Your Recommendations
              </Link>
            </div>
          </div>

          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm text-left rtl:text-right font-medium text-gray-600"
                        >
                          <div className="flex items-center gap-x-3">
                            <span>Title</span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm text-left rtl:text-right font-medium text-gray-600"
                        >
                          <span>Posted Date</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm text-left rtl:text-right font-medium text-gray-600"
                        >
                          <button className="flex items-center gap-x-2">
                            <span>Product</span>
                          </button>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm text-left rtl:text-right font-medium text-gray-600"
                        >
                          Recommendation Reason
                        </th>

                        <th className="px-4 py-3.5 text-sm text-left rtl:text-right font-medium text-gray-600">
                          Delete
                        </th>
                      </tr>
                    </thead>
                    {recommendations.map((recommendation) => (
                      <tbody
                        key={recommendation._id}
                        className="bg-white divide-y divide-gray-200 "
                      >
                        <tr className="">
                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            {recommendation.recommendation_title.substring(
                              0,
                              40,
                            )}
                            ...
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            {format(
                              new Date(
                                recommendation.recommended_by.posted_date,
                              ),
                              "Pp",
                            )}
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            {recommendation.recommendation_product_name}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            {recommendation.recommendation_reason.substring(
                              0,
                              20,
                            )}
                            ...
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-x-6">
                              <button
                                onClick={() =>
                                  handleRecommendationDelete(
                                    recommendation._id,
                                    recommendation.queryInfo.query_id,
                                  )
                                }
                                className="text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="space-y-5 text-center mt-20">
          <h1 className="text-4xl font-bold">No Query Available</h1>
          <Link
            to={"/all-queries"}
            className="btn btn-lg px-3 py-1 text-blue-600 bg-blue-100  "
          >
            <IoMdAdd />
            Give Your Recommendations
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyRecommendations;
