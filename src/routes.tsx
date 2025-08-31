import { createBrowserRouter, redirect } from "react-router-dom";
import {
  blogInfiniteLoader,
  confirmPasswordLoader,
  homeLoader,
  loginLoader,
  onePostLoader,
  oneProductLoader,
  otpLoader,
  productInfiniteLoader,
} from "@/router/loader";
import Home from "./pages/Home.tsx";
import Contact from "./pages/Contact.tsx";
import RootLayout from "@/pages/RootLayout.tsx";
import ErrorPage from "@/pages/Error.tsx";
import BlogRootLayout from "@/pages/blogs/BlogRootLayout.tsx";
import BlogPage from "@/pages/blogs/BlogPage.tsx";
import BlogDetailPage from "@/pages/blogs/BlogDetailPage.tsx";
import ProductRootLayout from "@/pages/Products/ProductRootLayout.tsx";
import ProductPage from "@/pages/Products/ProductPage.tsx";
import ProductDetailPage from "@/pages/Products/ProductDetail.tsx";
import Login from "@/pages/Auth/Login.tsx";
import {
  confirmPasswordAction,
  loginAction,
  logoutAction,
  otpAction,
  registerAction,
} from "./router/action/index.ts";
import AuthRootLayout from "./components/auth/AuthRootLayout.tsx";
import SignUpPage from "@/pages/Auth/SignUpPage.tsx";
import InputPage from "@/pages/Auth/Input-Otp.tsx";
import ConfirmPasswordPage from "./pages/Auth/Confirm-password.tsx";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home, loader: homeLoader },
      { path: "contact", Component: Contact },
      {
        path: "blogs",
        Component: BlogRootLayout,
        loader: blogInfiniteLoader,
        children: [
          { index: true, Component: BlogPage },
          { path: ":postId", Component: BlogDetailPage, loader: onePostLoader },
        ],
      },
      {
        path: "products",
        Component: ProductRootLayout,

        children: [
          {
            index: true,
            Component: ProductPage,
            loader: productInfiniteLoader,
          },
          {
            path: ":productId",
            Component: ProductDetailPage,
            loader: oneProductLoader,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
    action: loginAction,
    loader: loginLoader,
  },
  {
    path: "/register",
    Component: AuthRootLayout,
    children: [
      {
        index: true,
        Component: SignUpPage,
        loader: loginLoader,
        action: registerAction,
      },
      {
        path: "otp",
        Component: InputPage,
        loader: otpLoader,
        action: otpAction,
      },
      {
        path: "confirm-password",
        Component: ConfirmPasswordPage,
        loader: confirmPasswordLoader,
        action: confirmPasswordAction,
      },
    ],
  },
  {
    path: "/logout",
    action: logoutAction,
    loader: () => redirect("/"),
  },
]);
