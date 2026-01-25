import { Link } from "react-router-dom";
import error from "../assets/404-error.jpg";
const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center h-screen justify-center space-y-4">
      <div>
        <img src={error} className="w-96 h-96" alt="" />
      </div>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Oops! Page not found!</h1>
        <p className="">
          We&apos;re sorry, we couldn&apos;t find the page you requested.
        </p>
        <Link
          to={"/"}
          className="btn w-full mx-auto bg-[#00c1a2] text-white text-lg"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
