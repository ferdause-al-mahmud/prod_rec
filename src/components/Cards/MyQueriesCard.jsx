/* eslint-disable react/prop-types */

import { format } from "date-fns";
import { useState } from "react";
import { AiOutlineSafetyCertificate, AiTwotoneLike } from "react-icons/ai";
import { MdDateRange, MdProductionQuantityLimits } from "react-icons/md";
import { TbCategory, TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";

const MyQueriesCard = ({ query, handleDeleteButton }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="card bg-base-100 rounded-lg w-[350px] lg:w-96 shadow-2xl hover:shadow-green-300 hover:scale-105 hover:ease-in-out duration-300 ">
      <figure className="pt-8 ">
        <img
          src={query.product_photo}
          className="w-80 h-60 rounded-lg  object-cover "
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src={query.posted_by.photo}
              className="w-10 h-10 object-cover rounded-full"
              alt=""
            />
            <div>
              <h3 className="text-base font-medium">{query.posted_by.name}</h3>
              <p className="text-sm font-medium text-gray-500">
                {query.posted_by.email}
              </p>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            {" "}
            <Link to={`/query-details/${query._id}`}>
              <TbListDetails className="text-lg text-gray-500 hover:text-sky-400 focus:outline-none" />
            </Link>
            <button
              onClick={() => handleDeleteButton(query._id)}
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
        </div>

        <div>
          <div className="space-y-2 h-max rounded-lg mt-4">
            <h3 className="text-base font-semibold">{query.query_title}</h3>

            <div className="flex items-center">
              <MdProductionQuantityLimits className="mr-3" />
              <h3 className="text-base font-semibold w-1/2">Product Name</h3>
              <p className="text-sm font-medium w-1/2">{query.product_name}</p>
            </div>
            <div className="flex items-center">
              <AiOutlineSafetyCertificate className="mr-3" />
              <h3 className="text-base font-semibold w-1/2">Product Brand</h3>
              <p className="text-sm font-medium w-1/2">{query.product_brand}</p>
            </div>

            <div className="flex items-center">
              <TbCategory className="mr-3" />
              <h3 className="text-base font-semibold w-1/2">Category</h3>
              <p className="text-sm font-medium w-1/2">{query.category}</p>
            </div>

            <div className="flex items-center">
              <MdDateRange className="mr-3" />
              <h3 className="text-base font-semibold w-1/2">Posted Date</h3>
              <p className="text-sm font-medium w-1/2">
                {format(new Date(query.posted_by.posted_date), "Pp")}
              </p>
            </div>

            <div className="flex items-center">
              <AiTwotoneLike className="mr-3" />
              <h3 className="text-base font-semibold w-1/2">
                Total Recommendation
              </h3>
              <span className="text-center text-sm font-medium px-3 py-1 text-[#06d6a0] bg-[#bbffed9b] rounded-full">
                {query.posted_by.recommendationCount}
              </span>
            </div>

            <div className="">
              <h3 className="text-base font-semibold mt-5">
                Boycotting Reason
              </h3>
              <p className="text-sm mt-2">
                {/* {queryDetails.boycotting_reason} */}
                {isExpanded
                  ? query.boycotting_reason
                  : `${query.boycotting_reason.slice(0, 100)}...`}
                <button onClick={toggleDescription} className="ml-3 underline">
                  {isExpanded ? "Hide" : "Read More"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyQueriesCard;
