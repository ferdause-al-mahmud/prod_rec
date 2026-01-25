/* eslint-disable react/prop-types */

import { format } from "date-fns";
import { useEffect, useState } from "react";
import { BiSad } from "react-icons/bi";

const RecommendationCard = ({ query }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/recommendations/${query._id}`)
      .then((res) => res.json())
      .then((data) => setRecommendations(data));
  }, [query._id]);

  return (
    <div>
      <section className="w-5/6 px-4 mx-auto p-5 border-2 mb-5 rounded-lg shadow-lg hover:shadow-sky-300">
        <div className="flex items-center gap-4 border-b pb-2 mb-4">
          <img
            src={query.product_photo}
            className="w-10 h-10 rounded-md"
            alt=""
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Query: {query.query_title}
            </h2>
            <p className="text-gray-600 text-sm">
              Product: {query.product_name} | Posted Time:{" "}
              {format(new Date(query.posted_by.posted_date), "Pp")}
            </p>
          </div>
        </div>

        {recommendations?.length > 0 ? (
          <>
            {" "}
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex  items-center gap-x-3">
                <h2 className="text-lg font-medium text-gray-800 ">
                  All Recommendations for Me
                </h2>

                <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
                  {recommendations.length} Recommendations
                </span>
              </div>

              <div className="flex items-center gap-x-3">
                {/* <button className="btn">
                  <FaSortAmountDownAlt />
                  Sort by Latest
                </button> */}
              </div>
            </div>
            <div className="flex flex-col mt-6">
              <div className="-mx-4 -my-2 w-full overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                            Reason
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm text-left rtl:text-right font-medium text-gray-600"
                          >
                            Recommender Email
                          </th>

                          <th className="px-4 py-3.5 text-sm text-left rtl:text-right font-medium text-gray-600">
                            Recommender
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
                              {recommendation.recommendation_title}
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
                              <div className="flex items-center gap-x-2">
                                <p
                                  className={`px-3 py-1  text-[#06d6a0] bg-[#bbffed9b] text-xs  rounded-full`}
                                >
                                  {recommendation.recommended_by.email}
                                </p>
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                              {recommendation.recommended_by.name}
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <h1 className="flex justify-center items-center gap-2 text-gray-400">
            No Recommendation for this <BiSad />
          </h1>
        )}
      </section>
    </div>
  );
};

export default RecommendationCard;
