import { useContext } from "react";
import editImg from "../assets/update.jpg";
import { AuthContext } from "../provider/AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const EditQuery = () => {
  const { user } = useContext(AuthContext);
  const queryDetails = useLoaderData();
  const navigate = useNavigate();
  // console.log(queryDetails);

  const handleEditQuery = (e) => {
    e.preventDefault();
    const form = e.target;
    const query_title = form.query_title.value;
    const product_name = form.product_name.value;
    const category = form.category.value;
    const product_brand = form.product_brand.value;
    const product_photo = form.product_photo.value;
    const boycotting_reason = form.boycotting_reason.value;
    const currentDateTime = new Date();

    const queryData = {
      query_title,
      product_name,
      category,
      product_brand,
      product_photo,
      boycotting_reason,
      posted_by: {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
        posted_date: currentDateTime,
        recommendationCount: 0,
      },
    };
    // console.log(queryData);

    const notify = () => toast.success("Query Updated Successfully");

    // Update query to the database
    axios
      .put(`http://localhost:3000/query/${queryDetails._id}`, queryData)
      .then((res) => {
        console.log(res.data);
        if (res.data.acknowledged === true) {
          notify();
          form.reset();
          navigate(`/query-details/${queryDetails._id}`);
        }
      });
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse items-stretch gap-10 justify-center min-h-[calc(100vh-306px)] my-12 ">
      <div className="w-5/6 mx-auto lg:mx-0 lg:w-1/3 ">
        <img src={editImg} className="" alt="" />
      </div>
      <section className="items-stretch p-10 md:p-6  bg-white rounded-md shadow-xl w-5/6 lg:w-1/3 mx-auto lg:mx-0">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Post a Query
        </h2>

        <form onSubmit={handleEditQuery}>
          <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
            <div>
              <label className="text-gray-700 " htmlFor="job_title">
                Query TItle
              </label>
              <input
                id="query_title"
                required
                defaultValue={queryDetails.query_title}
                placeholder="enter query title"
                name="query_title"
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
                defaultValue={queryDetails.product_name}
                placeholder="e.g. iPhone 12, etc."
                type="text"
                name="product_name"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700 " htmlFor="category">
                Category
              </label>
              <input
                name="category"
                id="category"
                required
                defaultValue={queryDetails.category}
                placeholder="e.g. mobile, laptop, etc."
                type="text"
                className="border p-2 rounded-md"
              ></input>
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="product_brand">
                Product Brand
              </label>
              <input
                id="product_brand"
                name="product_brand"
                required
                defaultValue={queryDetails.product_brand}
                placeholder="e.g. Apple, Samsung, etc."
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-gray-700" htmlFor="product_photo">
                Product Photo
              </label>
              <input
                id="product_photo"
                name="product_photo"
                required
                defaultValue={queryDetails.product_photo}
                placeholder="photo_url"
                type="url"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-gray-700 " htmlFor="description">
              Boycotting Reason Details
            </label>
            <textarea
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              name="boycotting_reason"
              defaultValue={queryDetails.boycotting_reason}
              id="boycotting_reason"
              required
            ></textarea>
          </div>
          <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 btn bg-[#00c1a2]  text-lg font-medium text-white transition-colors duration-300 transhtmlForm  rounded-md hover:bg-gray-600">
              Update Query
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditQuery;
