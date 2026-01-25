/* eslint-disable react/prop-types */

import { format } from "date-fns";
import { useState } from "react";
import {
  AiOutlineLike,
  AiOutlineSafetyCertificate,
  AiTwotoneLike,
} from "react-icons/ai";
import { MdDateRange, MdProductionQuantityLimits } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { Link } from "react-router-dom";

const QueryCard = ({ query }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      // to={`/query-details/${query._id}`}
      className="card bg-base-100 rounded-lg w-[350px] lg:w-96 shadow-2xl hover:shadow-green-300 hover:scale-105 hover:ease-in-out duration-300"
    >
      <figure className="pt-8 ">
        <img
          src={query.product_photo}
          className="w-80 h-60 rounded-lg object-cover "
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
          <Link
            to={`/query-details/${query._id}`}
            className="text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none"
          >
            <AiOutlineLike className="text-2xl" />
          </Link>
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

export default QueryCard;
