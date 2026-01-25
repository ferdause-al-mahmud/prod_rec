import { FaGoogle } from "react-icons/fa";
import login from "../assets/login.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const { loginUser, loginWithGoogle } = useContext(AuthContext);
  const notify = () => toast.success("Login Successfully");
  const notify2 = () => toast.error("Worng Email or Password");
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((res) => {
        console.log(res.user);
        if (res.user?.email) {
          notify();
          navigate(location.state ? location.state : "/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then((res) => {
        console.log(res.user);
        if (res.user?.email) {
          notify();
          navigate(location.state ? location.state : "/");
          form.reset();
        }
      })
      .catch((err) => {
        notify2();
        console.log(err);
      });
  };

  return (
    <div className="hero bg-white  items-start mt-10 lg:mt-20 h-max">
      <div className="hero-content bg-white justify-around rounded-lg shadow-2xl py-10 flex-col lg:flex-row">
        <div className="w-full lg:w-1/2">
          <img src={login} alt="" />
        </div>
        <div className="w-5/6 lg:w-1/2 max-w-sm shrink-0 ">
          <form onSubmit={handleLogin} className="">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Login to ProdRec</h2>
              <p>Enter your email address and login to your account.</p>
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-[#00c1a2] text-white text-lg font-medium">
                Login
              </button>
              <span className="text-gray-300 text-center my-4">OR</span>
            </div>
          </form>
          <button
            onClick={handleGoogleLogin}
            className="btn w-full bg-[#f4415019] text-[#F4414F] text-lg font-medium"
          >
            <FaGoogle className="text-[#F4414F]" />
            Login with Google
          </button>
          <h1 className="mt-5">
            Don&apos;t have an account?{" "}
            <Link
              to={"/register"}
              state={location.state}
              className="text-[#00c1a2]"
            >
              Sign up
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
