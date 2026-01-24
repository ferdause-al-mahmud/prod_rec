import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          console.log("error.response.status", error.response.status);
          logoutUser()
            .then(() => {
              console.log("Logged Out");
              navigate("/login");
            })
            .catch((err) => {
              console.log("Error while logging out", err);
            });
        }
        return Promise.reject(error);
      },
    );
  }, [logoutUser, navigate]);

  return instance;
};

export default useAxiosSecure;
