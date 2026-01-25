import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { TbListDetails } from "react-icons/tb";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { IoGridOutline } from "react-icons/io5";
import MyQueriesCard from "../components/Cards/MyQueriesCard";
import myQueries from "../assets/my-queries.jpg";
import { FaList } from "react-icons/fa";
import noData from "../assets/no-data.jpg";

const MyQueries = () => {
  const { user } = useContext(AuthContext);
  const [queries, setQueries] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [grid, setGrid] = useState(true);

  useEffect(() => {
    axiosSecure.get(`/queries/${user?.email}`).then((res) => {
      setQueries(res.data);
    });
  }, [user?.email, axiosSecure]);

  const handleDeleteButton = (id) => {
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
        axios.delete(`http://localhost:3000/queries/${id}`).then((res) => {
          // console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Query has been deleted.",
              icon: "success",
            });
            const newQueries = queries.filter((query) => query._id !== id);
            setQueries(newQueries);
          }
        });
      }
    });
  };

  return (
    <div>
      {/* banner  */}
      <div
        className="hero h-[80vh] lg:h-[50vh]"
        style={{
          backgroundImage: `url(${myQueries})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-3xl">
            <h1 className="mb-5 text-3xl lg:text-5xl font-bold">
              Manage, Explore, and Find Solutions to Your Posted Queries
            </h1>
            <p className="mb-5">
              Discover All Your Posted Queries in One Place, Manage
              Recommendations, and Explore Solutions Tailored to Your Needs
            </p>
            <Link
              to={"/add-queries"}
              className="btn btn-lg px-3 py-1 text-blue-600 bg-blue-100 rounded-md "
            >
              <IoMdAdd />
              Post Your Queries
            </Link>{" "}
          </div>
        </div>
      </div>

      {queries.length > 0 ? (
        <section className="w-full lg:w-5/6 px-4 mx-auto pt-12">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex  items-center  justify-center lg:justify-start gap-x-3">
              <h2 className="text-lg font-medium text-gray-800 ">
                My Posted Queries
              </h2>

              <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
                {queries.length} Queries
              </span>
            </div>

            {/* Grid Layout Button */}
            <div className="flex items-center gap-x-3 flex-col md:flex-row">
              <div className="flex gap-5 items-center my-5">
                <button
                  onClick={() => setGrid(!grid)}
                  className={grid ? "btn btn-sm btn-info" : "btn btn-sm"}
                >
                  <IoGridOutline />
                </button>
                <button
                  onClick={() => setGrid(!grid)}
                  className={!grid ? "btn btn-sm btn-info" : "btn btn-sm"}
                >
                  <FaList />
                </button>
                {/* Post Your Queries Button */}
                <Link
                  to={"/add-queries"}
                  className="btn px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full "
                >
                  <IoMdAdd />
                  Post Your Queries
                </Link>
              </div>
            </div>
          </div>
          {grid ? (
            <div className="mt-10 grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {queries.map((query) => (
                <MyQueriesCard
                  key={query._id}
                  query={query}
                  handleDeleteButton={handleDeleteButton}
                ></MyQueriesCard>
              ))}
            </div>
          ) : (
            <section>
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
                              Category
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm text-left rtl:text-right font-medium text-gray-600"
                            >
                              Boycotting Reason
                            </th>

                            <th className="px-4 py-3.5 text-sm text-left rtl:text-right font-medium text-gray-600">
                              Action
                            </th>
                          </tr>
                        </thead>
                        {queries.map((query) => (
                          <tbody
                            key={query._id}
                            className="bg-white divide-y divide-gray-200 "
                          >
                            <tr className="">
                              <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                {query.query_title.substring(0, 30)}...
                              </td>

                              <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                {format(
                                  new Date(query.posted_by.posted_date),
                                  "Pp",
                                )}
                              </td>

                              <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                {query.product_name}
                              </td>
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <div className="flex items-center gap-x-2">
                                  <p
                                    className={`px-3 py-1  text-[#06d6a0] bg-[#bbffed9b] text-xs  rounded-full`}
                                  >
                                    {query.category}
                                  </p>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                {query.boycotting_reason.substring(0, 20)}...
                              </td>
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <div className="flex items-center gap-x-6">
                                  <Link to={`/query-details/${query._id}`}>
                                    <TbListDetails className="text-lg text-gray-500 hover:text-sky-400 focus:outline-none" />
                                  </Link>
                                  <button
                                    onClick={() =>
                                      handleDeleteButton(query._id)
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

                                  <Link
                                    to={`/edit-query/${query._id}`}
                                    className="text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none"
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
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                      />
                                    </svg>
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
            </section>
          )}
        </section>
      ) : (
        <div className="space-y-5 text-center mt-20">
          <h1 className="text-4xl font-bold">No Query Available</h1>
          {/* <Link
            to={"/add-queries"}
            className="btn px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full "
          >
            <IoMdAdd />
            Post Your Queries
          </Link> */}
          <img src={noData} className="h-96 w-96 mx-auto" alt="" />
        </div>
      )}
    </div>
  );
};

export default MyQueries;
