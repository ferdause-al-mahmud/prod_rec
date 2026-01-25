/* eslint-disable react/prop-types */

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import axios from "axios";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  console.log("user-->", user);

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      // Save user data to backend
      const userData = {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      };
      axios.post("http://localhost:3000/save-user", userData);
      return result;
    });
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logoutUser = () => {
    return signOut(auth);
  };

  const createUser = (email, password, name = "User", photo = "") => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then(
      (result) => {
        const user = result.user;

        // Update Firebase profile with name and photo
        return updateProfile(user, {
          displayName: name,
          photoURL: photo,
        }).then(() => {
          // Save user data to backend with registration data
          const userData = {
            email: email,
            name: name,
            photo: photo,
          };
          axios.post("http://localhost:3000/save-user", userData);
          return result;
        });
      },
    );
  };

  const profileUpdate = (updateData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updateData);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        const User = { email: currentUser.email };
        axios
          .post("http://localhost:3000/jwt", User, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
            setLoading(false);
          });
      } else {
        axios
          .post("http://localhost:3000/logout", {}, { withCredentials: true })
          .then((res) => {
            console.log(res.data);
            setLoading(false);
          });
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    loginWithGoogle,
    loginUser,
    logoutUser,
    createUser,
    profileUpdate,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
