import { authApi } from "@/api";
import {
  CategoryTypeQuery,
  InfiniteProductQuery,
  onePostQuery,
  postInfiniteQuery,
  postQuery,
  productQuery,
  queryClient,
  oneProductQuery,
} from "@/api/query";
import type { LoaderFunctionArgs } from "react-router-dom";
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

export const verifyLoader = async () => {
  const authStore = useAuthStore.getState();
  if (authStore.status !== Status.verify) {
    return redirect("/reset");
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

export const onePostLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.postId) {
    throw new Error("No Post ID provided");
  }
  await queryClient.ensureQueryData(postQuery("?limit=6"));
  await queryClient.ensureQueryData(onePostQuery(Number(params.postId)));
  return { postId: params.postId };
};

export const productInfiniteLoader = async () => {
  await queryClient.ensureQueryData(CategoryTypeQuery());
  await queryClient.prefetchInfiniteQuery(InfiniteProductQuery());
  return null;
};

export const oneProductLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.productId) {
    //productId is from route (path: ":productId",)
    throw new Error("No product ID provided");
  }
  await queryClient.ensureQueryData(productQuery("?limit=4"));
  await queryClient.ensureQueryData(oneProductQuery(Number(params.productId)));
  return { productId: params.productId };
};

export const newPasswordLoader = async () => {
  const authStore = useAuthStore.getState();

  if (authStore.status !== Status.reset) {
    return redirect("/reset");
  }
  return null;
};
