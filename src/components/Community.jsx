import { FcApproval, FcComments, FcDataProtection } from "react-icons/fc";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Community = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="mt-20 py-20 bg-[#f7f7ff]">
      <h1 className="mb-5 text-2xl max-w-3xl  text-center mx-auto text-black md:text-4xl font-bold">
        ProdRec Q&A communities are different. Here&apos;s how
      </h1>
      <div className="flex flex-col md:flex-row gap-5 lg:gap-10 w-11/12 lg:w-5/6 mx-auto">
        <div
          className="md:w-1/3 bg-white text-center p-10 rounded-lg shadow-xl hover:shadow-sky-100 "
          data-aos="fade-right"
        >
          <FcComments className="text-5xl mx-auto w-fit" />
          <h2 className="text-xl font-bold my-4">Expert communities.</h2>
          <p className="text-gray-500">
            This is just a simple text made for this unique and awesome
            template, you can easily edit it as you want.
          </p>
        </div>
        <div
          className="md:w-1/3 bg-white text-center p-10 rounded-lg shadow-xl hover:shadow-sky-100 "
          data-aos="fade-up"
        >
          <FcDataProtection className="text-5xl mx-auto w-fit" />
          <h2 className="text-xl font-bold my-4">
            The right answer. Right on top.
          </h2>
          <p className="text-gray-500">
            This is just a simple text made for this unique and awesome
            template, you can easily edit it as you want.
          </p>
        </div>
        <div
          className="md:w-1/3 bg-white text-center p-10 rounded-lg shadow-xl hover:shadow-sky-100 "
          data-aos="fade-down"
        >
          <FcApproval className="text-5xl mx-auto w-fit" />
          <h2 className="text-xl font-bold my-4">
            Share knowledge. Earn trust.
          </h2>
          <p className="text-gray-500">
            This is just a simple text made for this unique and awesome
            template, you can easily edit it as you want.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Community;
