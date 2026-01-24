import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { MdDateRange, MdProductionQuantityLimits } from "react-icons/md";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import CommentSwiper from "../components/CommentSwiper";

const QueryDetails = () => {
  const { user } = useContext(AuthContext);
  const queryDetails = useLoaderData();
  const [recommendationCount, setRecommendationCount] = useState(
    queryDetails.posted_by.recommendationCount,
  );
  // console.log(queryDetails);

  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/recommendations/${queryDetails._id}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [queryDetails._id]);

  const handleAddRecommendation = (e) => {
    e.preventDefault();

    const form = e.target;
    const recommendation_title = form.recommendation_title.value;
    const recommendation_product_name = form.product_name.value;
    const recommendation_product_brand = form.product_brand.value;
    const recommendation_product_photo = form.product_photo.value;
    const recommendation_reason = form.recommendation_reason.value;

    const query_id = queryDetails._id;
    const query_title = queryDetails.query_title;
    const query_product_name = queryDetails.product_name;
    const query_creator_name = queryDetails.posted_by.name;
    const query_creator_email = queryDetails.posted_by.email;
    // const query_recommendation_count =
    //   queryDetails.posted_by.recommendationCount;
    const currentDateTime = new Date();

    const recommendationData = {
      recommendation_title,
      recommendation_product_name,
      recommendation_product_brand,
      recommendation_product_photo,
      recommendation_reason,
      queryInfo: {
        query_id,
        query_title,
        query_product_name,
        query_creator_name,
        query_creator_email,
      },
      recommended_by: {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
        posted_date: currentDateTime,
      },
    };

    // console.log(recommendationData);

    const notify = () => toast.success("Recommendation Added Successfully");

    // Add the recommendation to the database
    axios
      .post("http://localhost:5000/recommendations", recommendationData)
      .then((res) => {
        // console.log(res.data);
        if (res.data.acknowledged === true) {
          setRecommendationCount(recommendationCount + 1);
          // Add the query to the database
          axios
            .put(
              `http://localhost:5000/update-recommendation-count/${queryDetails._id}`,
              recommendationCount,
            )
            .then((res) => {
              console.log(res.data);
              notify();
              // console.log(comments);
              const newComments = [recommendationData, ...comments];
              setComments(newComments);
              form.reset();
            });
        }
      });
  };

  return (
    <div>
      <main className="w-11/12 lg:w-5/6 mx-auto my-10">
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold">
            {queryDetails.query_title}
          </h1>
          <div className="flex items-center gap-3 my-5">
            <img
              src={queryDetails.posted_by.photo}
              className="w-10 h-10 object-cover rounded-full"
              alt=""
            />
            <div>
              <h3 className="text-lg lg:text-xl font-semibold">
                {queryDetails.posted_by.name}
              </h3>
              <p className="text-sm font-medium text-gray-500">
                {queryDetails.posted_by.email}
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:grid md:grid-cols-12 gap-10">
            {/* {" description"} */}

            <div className="card card-compact bg-base-100 rounded-lg shadow-xl col-span-7 h-max">
              <figure>
                <img
                  src={queryDetails.product_photo}
                  className="h-96 object-cover py-10"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h1 className="text-2xl font-semibold">Boycotting Reason</h1>
                <p className="text-base text-gray-500">
                  {queryDetails.boycotting_reason}
                </p>
                <div className="card-actions justify-end"></div>
              </div>
            </div>

            {/* {"details"} */}
            <div className="col-span-5 ">
              <div className="space-y-5 h-max p-10 bg-base-200 rounded-lg mb-10">
                <div className="flex items-center">
                  <MdProductionQuantityLimits className="mr-3" />
                  <h3 className="text-base md:text-xl font-semibold w-1/2">
                    Product Name
                  </h3>
                  <p className="text-base md:text-xl font-medium w-1/2">
                    {queryDetails.product_name}
                  </p>
                </div>
                <div className="flex items-center">
                  <AiOutlineSafetyCertificate className="mr-3" />
                  <h3 className="text-base md:text-xl font-semibold w-1/2">
                    Product Brand
                  </h3>
                  <p className="text-base md:text-xl font-medium w-1/2">
                    {queryDetails.product_brand}
                  </p>
                </div>
                <div className="flex items-center">
                  <BiCategoryAlt className="mr-3" />
                  <h3 className="text-base md:text-xl font-semibold w-1/2">
                    Category
                  </h3>
                  <p className="text-base md:text-xl font-medium w-1/2">
                    {queryDetails.category}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaRegUser className="mr-3" />
                  <h3 className="text-base md:text-xl font-semibold w-1/2">
                    Posted By
                  </h3>
                  <p className="text-base md:text-xl font-medium w-1/2">
                    {queryDetails.posted_by.name}
                  </p>
                </div>
                <div className="flex items-center">
                  <MdDateRange className="mr-3" />
                  <h3 className="text-base md:text-xl font-semibold w-1/2">
                    Posted Date
                  </h3>
                  <p className="text-base md:text-xl font-medium w-1/2">
                    {format(new Date(queryDetails.posted_by.posted_date), "Pp")}
                  </p>
                </div>
              </div>

              {/*   Give Your Recommendation    */}
              <section className="items-stretch p-10 md:p-6  bg-white rounded-md shadow-xl w-5/6 lg:w-full mx-auto lg:mx-0">
                <h2 className="text-lg font-semibold text-gray-700 capitalize ">
                  Give Your Recommendation
                </h2>

                <form onSubmit={handleAddRecommendation}>
                  <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
                    <div>
                      <label className="text-gray-700 " htmlFor="job_title">
                        Title
                      </label>
                      <input
                        id="recommendation_title"
                        required
                        placeholder="enter recommendation title"
                        name="recommendation_title"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                      />
                    </div>

                    <div>
                      <label className="text-gray-700 " htmlFor="emailAddress">
                        Product Name
                      </label>
                      <input
                        id="product_name"
                        required
                        placeholder="e.g. iPhone 12, etc."
                        type="text"
                        name="product_name"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                      />
                    </div>

                    <div>
                      <label className="text-gray-700 " htmlFor="product_brand">
                        Product Brand
                      </label>
                      <input
                        id="product_brand"
                        name="product_brand"
                        required
                        placeholder="e.g. Apple, Samsung, etc."
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                      />
                    </div>

                    <div>
                      <label className="text-gray-700" htmlFor="product_photo">
                        Product Photo
                      </label>
                      <input
                        id="product_photo"
                        name="product_photo"
                        required
                        placeholder="photo_url"
                        type="url"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    <label className="text-gray-700 " htmlFor="description">
                      Recommendation Reason
                    </label>
                    <textarea
                      className="block w-full h-60 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                      name="recommendation_reason"
                      id="recommendation_reason"
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button className="px-8 py-2.5 leading-5 btn bg-[#00c1a2]  text-lg font-medium text-white transition-colors duration-300 transhtmlForm  rounded-md hover:bg-gray-600">
                      Add Recommendation
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>

        {/* All Recommendation */}
        <div className="">
          <h1 className="my-20 text-center text-4xl font-bold">
            All Recommendations ({recommendationCount})
          </h1>

          {/* Comment Card */}
          <CommentSwiper
            comments={comments}
            query_id={queryDetails._id}
          ></CommentSwiper>
        </div>
      </main>
    </div>
  );
};

export default QueryDetails;
