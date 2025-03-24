import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Blog from "./pages/Blog.jsx";
import Home from "./pages/Home.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import BlogDetailedPage from "./pages/BlogDetailedPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import CreateBlogPage from "./pages/CreateBlogPage.jsx";
import BlogUpdatePage from "./pages/BlogUpdatePage.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "auth",
        element: <AuthPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "create",
        element: <CreateBlogPage />,
      },
      {
        path: "update/:blogId",
        element: <BlogUpdatePage />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/detail/:blogId",
        element: <BlogDetailedPage />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
