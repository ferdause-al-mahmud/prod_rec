/* eslint-disable react/prop-types */

import { format } from "date-fns";
import { useState } from "react";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
// import { BiCategoryAlt } from "react-icons/bi";
import { MdDateRange, MdProductionQuantityLimits } from "react-icons/md";

const CommentCard = ({ comment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  // console.log(comment);

  const {
    recommendation_product_brand,
    recommendation_product_name,
    recommendation_product_photo,
    recommendation_reason,
    recommendation_title,
    recommended_by,
  } = comment;

  return (
    <div className="card bg-base-100 rounded-lg w-[350px] lg:w-96 shadow-2xl hover:shadow-sky-300">
      <figure>
        <img
          src={recommendation_product_photo}
          className="w-80 h-80 object-cover "
        />
      </figure>
      <div className="card-body">
        <div className="flex items-center gap-3">
          <img
            src={recommended_by.photo}
            className="w-10 h-10 object-cover rounded-full"
            alt=""
          />
          <div>
            <h3 className="text-base font-medium">{recommended_by.name}</h3>
            <p className="text-sm font-medium text-gray-500">
              {recommended_by.email}
            </p>
          </div>
        </div>
        <div>
          <div className="space-y-2 h-max rounded-lg mt-4">
            <h3 className="text-base font-semibold">{recommendation_title}</h3>

            <div className="flex items-center">
              <MdProductionQuantityLimits className="mr-3" />
              <h3 className="text-base font-semibold w-1/2">Product Name</h3>
              <p className="text-sm font-medium w-1/2">
                {recommendation_product_name}
              </p>
            </div>
            <div className="flex items-center">
              <AiOutlineSafetyCertificate className="mr-3" />
              <h3 className="text-base font-semibold w-1/2">Product Brand</h3>
              <p className="text-sm font-medium w-1/2">
                {recommendation_product_brand}
              </p>
            </div>

            <div className="flex items-center">
              <MdDateRange className="mr-3" />
              <h3 className="text-base font-semibold w-1/2">Posted Date</h3>
              <p className="text-sm font-medium w-1/2">
                {format(new Date(recommended_by.posted_date), "Pp")}
              </p>
            </div>

            <div className="">
              <h3 className="text-base font-semibold mt-5">
                Recommendation Reason
              </h3>
              <p className="text-sm mt-2">
                {/* {queryDetails.boycotting_reason} */}
                {isExpanded
                  ? recommendation_reason
                  : `${recommendation_reason.slice(0, 100)}...`}
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

export default CommentCard;
