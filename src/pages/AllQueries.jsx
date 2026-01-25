import { format } from "date-fns";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { IoGridOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import QueryCard from "../components/Cards/QueryCard";
import axios from "axios";
import { FaList } from "react-icons/fa";

const AllQueries = () => {
  const [queries, setQueries] = useState([]);
  const [grid, setGrid] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/queries?search=${searchText}`)
      .then((res) => {
        setQueries(res.data);
      });
  }, [searchText]);

  return (
    <section className="w-11/12 md:w-full lg:w-5/6 px-4 mx-auto pt-12 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex  items-center justify-center md:justify-start gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
            All Posted Queries
          </h2>

          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
            {queries.length} Queries
          </span>
        </div>

        {/* Grid Layout Button */}
        <div className="flex items-center gap-x-3 flex-col md:flex-row">
          <div className="flex gap-5 items-center my-5">
            <button
              onClick={() => setGrid(!grid)}
              className={`btn btn-sm transition-all duration-300 ${grid ? "btn-info" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`}
            >
              <IoGridOutline />
            </button>
            <button
              onClick={() => setGrid(!grid)}
              className={`btn btn-sm transition-all duration-300 ${!grid ? "btn-info" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`}
            >
              <FaList />
            </button>
            {/* Post Your Queries Button */}
            <Link
              to={"/add-queries"}
              className="btn px-3 py-1 text-xs text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-300"
            >
              <IoMdAdd />
              Post Your Queries
            </Link>
          </div>

          <label className="input input-bordered flex items-center gap-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus-within:border-cyan-500 transition-colors duration-300">
            <input
              onKeyUp={(e) => setSearchText(e.target.value)}
              type="text"
              className="grow bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70 text-gray-600 dark:text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>
      {queries.length > 0 ? (
        <div>
          {" "}
          {grid ? (
            <div className="mt-10 grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {queries.map((query) => (
                <QueryCard key={query._id} query={query}></QueryCard>
              ))}
            </div>
          ) : (
            <div className="flex flex-col mt-6">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 px-4 text-sm text-left rtl:text-right font-medium text-gray-600 dark:text-gray-300"
                          >
                            <div className="flex items-center gap-x-3">
                              <span>Title</span>
                            </div>
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm text-left rtl:text-right font-medium text-gray-600 dark:text-gray-300"
                          >
                            <span>Posted Date</span>
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm text-left rtl:text-right font-medium text-gray-600 dark:text-gray-300"
                          >
                            <button className="flex items-center gap-x-2">
                              <span>Product</span>
                            </button>
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm text-left rtl:text-right font-medium text-gray-600 dark:text-gray-300"
                          >
                            Category
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm text-left rtl:text-right font-medium text-gray-600 dark:text-gray-300"
                          >
                            Boycotting Reason
                          </th>

                          <th className="px-4 py-3.5 text-sm text-left rtl:text-right font-medium text-gray-600 dark:text-gray-300">
                            Total Recommendation
                          </th>
                        </tr>
                      </thead>
                      {queries.map((query) => (
                        <tbody
                          key={query._id}
                          className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700"
                        >
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                              {query.query_title.substring(0, 40)}...
                            </td>

                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                              {format(
                                new Date(query.posted_by.posted_date),
                                "Pp",
                              )}
                            </td>

                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                              {query.product_name}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-2">
                                <p
                                  className={`px-3 py-1 text-[#06d6a0] bg-[#bbffed9b] dark:bg-cyan-900/40 dark:text-cyan-300 text-xs rounded-full`}
                                >
                                  {query.category}
                                </p>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                              {query.boycotting_reason.substring(0, 20)}...
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-6">
                                <span className="text-gray-500 dark:text-gray-400">
                                  {query.posted_by.recommendationCount}
                                </span>

                                <Link
                                  to={`/query-details/${query._id}`}
                                  className="text-gray-500 dark:text-gray-400 transition-colors duration-200 hover:text-yellow-500 dark:hover:text-yellow-400 focus:outline-none"
                                >
                                  <AiOutlineLike className="text-2xl" />
                                </Link>
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
          )}
        </div>
      ) : (
        <div className=" p-10 text-center">
          <span className="loading loading-spinner loading-lg text-accent"></span>
        </div>
      )}
    </section>
  );
};

export default AllQueries;
