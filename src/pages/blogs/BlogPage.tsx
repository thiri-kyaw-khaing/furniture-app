import { postInfiniteQuery } from "@/api/query";
import { Button } from "@/components/ui/button";
// import {posts} from "@/data/posts.ts";
import BlogPostList from "@/pages/blogs/BlogPostList.tsx";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function BlogPage() {
  const {
    data,
    status,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(postInfiniteQuery());
  const allPosts = data?.pages.flatMap((page) => page.posts) || [];
  return status === "pending" ? (
    <p>"Loading..."</p>
  ) : status === "error" ? (
    <p>{error.message}</p>
  ) : (
    <div className="container mx-auto max-w-screen-xl">
      <h2 className="mt-8 font-bold text-2xl text-center md:text-left md:ml-4 mb-3">
        Latest Blog Posts
      </h2>
      <BlogPostList posts={allPosts} />
      <div className="flex justify-center mb-6">
        <Button
          onClick={() => fetchNextPage()}
          variant={!hasNextPage ? "ghost" : "secondary"}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load more"
            : "Nothing more to load"}
        </Button>
      </div>
    </div>
  );
}
