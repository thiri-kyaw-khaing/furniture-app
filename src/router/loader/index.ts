import api, { authApi } from "@/api";
import {
  postInfiniteQuery,
  postQuery,
  productQuery,
  queryClient,
} from "@/api/query";

import useAuthStore, { Status } from "@/store/authStore";
import { redirect } from "react-router-dom";

// export const homeLoader = async () => {
//   try {
//     const response = await api.get("/users/products");
//     return response.data;
//   } catch (e) {
//     console.error("HomeLoader error", e);
//   }
// };
// export const homeLoader = async () => {
//   const products = await api.get("/users/products?limit=8");
//   const posts = await api.get("/users/posts/infinite?limit=3");

//   return { productData: products.data, postData: posts.data };
// };

export const homeLoader = async () => {
  await queryClient.ensureQueryData(productQuery("?limit=8"));
  await queryClient.ensureQueryData(postQuery("?limit=3"));
  return null;
};

export const loginLoader = async () => {
  try {
    const response = await authApi.get("auth-check");
    if (response.status !== 200) {
      return null;
    }
    return redirect("/");
  } catch (e) {
    console.error("loginLoader error", e);
  }
};

export const otpLoader = async () => {
  const authStore = useAuthStore.getState();
  if (authStore.status !== Status.otp) {
    return redirect("/login");
  }
  return null;
};

export const confirmPasswordLoader = async () => {
  const authStore = useAuthStore.getState();

  if (authStore.status !== Status.confirm) {
    return redirect("/register");
  }
  return null;
};

export const blogInfiniteLoader = async () => {
  await queryClient.ensureInfiniteQueryData(postInfiniteQuery());
  return null;
};
