import { FaGoogle } from "react-icons/fa";
import register from "../assets/register.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, profileUpdate, loginWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  const notify = () => toast.success("Signup Successfully");
  const notify2 = () =>
    toast.error(
      "Password must have an Uppercase, an LowerCase and Length 6 Character"
    );
  const notify3 = (error) => toast.error(error);

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((res) => {
        console.log(res.user);
        notify();
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const photo = e.target.photoUrl.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // password regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      notify2();
      return;
    }

    // register With Email And Password
    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        profileUpdate({ displayName: name, photoURL: photo })
          .then(() => {
            console.log("profile updated");
            notify();
            navigate(location.state ? location.state : "/");
          })
          .catch((error) => {
            console.log(error, "error");
          });
      })
      .catch((error) => {
        notify3(error.code);
        console.log(error.code, "error code");
      });
  };
  return (
    <div>
      <div className="hero bg-white  items-start mt-10 lg:mt-20 h-max">
        <div className="hero-content bg-white justify-around rounded-lg shadow-2xl py-10 flex-col lg:flex-row">
          <div className="w-full lg:w-1/2">
            <img src={register} alt="" />
          </div>
          <div className="w-5/6 lg:w-1/2 max-w-sm shrink-0 ">
            <form onSubmit={handleRegister} className="">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                  Join the ProdRec Community
                </h2>
                <p>
                  Give us some of your information to get free access to
                  Disilab.
                </p>
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text font-medium">Display Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Photo</span>
                </label>
                <input
                  type="url"
                  name="photoUrl"
                  placeholder="Photo URL"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
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
                  Sign up
                </button>
                <span className="text-gray-300 text-center my-4">OR</span>
              </div>
            </form>
            <button
              onClick={handleGoogleLogin}
              className="btn w-full bg-[#f4415019] text-[#F4414F] text-lg font-medium"
            >
              <FaGoogle className="text-[#F4414F]" />
              Sign up with Google
            </button>
            <h1 className="mt-5">
              Already have an account?{" "}
              <Link to={"/login"} className="text-[#00c1a2]">
                Log in
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
