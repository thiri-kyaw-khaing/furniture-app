// import { QueryClient } from "@tanstack/react-query";
// import api from ".";

// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60 * 5, // 5 minutes
//     },
//   },
// });

// const fetchProducts = async (q?: string) => {
//   const response = await api.get(`users/products${q ?? ""}`);
//   return response.data;
// };

// export const ProductQuery = (q?: string) => ({
//   queryKey: ["products", q],
//   queryFn: () => fetchProducts(q),
// });

// const fetchPosts = async (q?: string) => {
//   const response = await api.get(`users/posts/infinite${q ?? ""}`);
//   return response.data;
// };

// export const PostQuery = (q?: string) => ({
//   queryKey: ["posts", q],
//   queryFn: () => fetchPosts(q),
// });

// //useQuery => get method only
// //useMutation => post, put, delete methods
import { QueryClient } from "@tanstack/react-query";
import api from ".";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min
      // retry: 2,
    },
  },
});

const fetchProducts = async (q?: string) => {
  const response = await api.get(`users/posts/infinite${q ?? ""}`);
  return response.data;
};
// api.get(`users/products${q ?? ""}`).then((res) => res.data);

export const productQuery = (q?: string) => ({
  queryKey: ["products", q],
  queryFn: () => fetchProducts(q),
});

const fetchPosts = (q?: string) =>
  api.get(`users/posts/infinite${q ?? ""}`).then((res) => res.data);

export const postQuery = (q?: string) => ({
  queryKey: ["posts", q],
  queryFn: () => fetchPosts(q),
});
