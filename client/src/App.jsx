import React, { useEffect, useState } from "react";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../src/component/Navbar.jsx";
import Footer from "../src/component/Footer.jsx";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { loginFailure, loginSuccess } from "../src/redux/user.slice.js";
import { loadingEnd } from "../src/redux/loading.slice.js";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setBlogs, setError } from "./redux/blog.slice.js";
import Loader from "./loader/Loader.jsx";

function App() {
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.loading.refresh);
  const loading = useSelector((state) => state.loading.status);
  const getCurrentUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/blog-app/user/get-current-user",

        {
          withCredentials: true,
        }
      );
      dispatch(loginSuccess(res.data?.data));
      dispatch(loadingEnd());
    } catch (error) {
      console.log(error);
      dispatch(loginFailure());
      dispatch(loadingEnd());
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/blog-app/blog/all`
      );
      dispatch(setBlogs(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCurrentUser();
    fetchBlogs();
  }, [refresh]);
  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <Outlet />
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </>
  );
}

export default App;
