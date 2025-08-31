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
import { keepPreviousData, QueryClient } from "@tanstack/react-query";
import api from ".";
// import { number } from "zod";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min
      // retry: 2,
    },
  },
});

const fetchProducts = async (q?: string) => {
  const response = await api.get(`users/products${q ?? ""}`);
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

const fetchInfinitePosts = async ({ pageParam = null }) => {
  const query = pageParam ? `?limit=6&cursor=${pageParam}` : "?limit=6";
  const response = await api.get(`users/posts/infinite${query}`);
  return response.data;
};

export const postInfiniteQuery = () => ({
  queryKey: ["posts", "infinite"],
  queryFn: ({ pageParam = null }) => fetchInfinitePosts({ pageParam }),
  initialPageParam: null, //start with no cursor
  getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  //getPreviousPageParam:(firstPage,pages)=>firstPage.prevCursor??undefined,
  //maxPages:6
});

const fetchOnePost = async (id: number) => {
  const post = await api.get(`users/posts/${id}`);

  if (!post) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return post.data;
};

export const onePostQuery = (id: number) => ({
  queryKey: ["posts", "detail", id],
  queryFn: () => fetchOnePost(id),
});

const fetchCategoryType = async () =>
  api.get("users/filter-type").then((res) => res.data);

export const CategoryTypeQuery = () => ({
  queryKey: ["category", "type"],
  queryFn: fetchCategoryType,
});

const fetchInfiniteProducts = async ({
  pageParam = null,
  categories = null,
  types = null,
}: {
  pageParam?: number | null;
  categories?: string | null;
  types?: string | null;
}) => {
  let query = pageParam ? `?limit=9&cursor=${pageParam}` : "?limit=9";
  if (categories) query += `&category=${categories}`;
  if (types) query += `&type=${types}`;
  const response = await api.get(`users/products${query}`);
  return response.data;
};

export const InfiniteProductQuery = (
  categories: string | null = null,
  types: string | null = null
) => ({
  queryKey: [
    "products",
    "infinite",
    categories ?? undefined,
    types ?? undefined,
  ],
  queryFn: ({ pageParam }: { pageParam?: number | null }) =>
    fetchInfiniteProducts({ pageParam, categories, types }),
  placeholderData: keepPreviousData,
  initialPageParam: null, //start with no cursor
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor ?? undefined,
  //getPreviousPageParam:(firstPage,pages)=>firstPage.prevCursor??undefined,
  //maxPages:6
});

const fetchOneProduct = async (id: number) => {
  const product = await api.get(`users/products/${id}`);
  if (!product) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return product.data;
};

export const oneProductQuery = (id: number) => ({
  queryKey: ["product", "detail", "query", id],
  queryFn: () => fetchOneProduct(id),
});
