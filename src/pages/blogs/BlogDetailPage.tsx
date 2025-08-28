import { Button } from "@/components/ui/button.tsx";
import { Link, useLoaderData } from "react-router-dom";
import { ArrowLeft, LayersIcon } from "lucide-react";
import RichTextRender from "@/pages/blogs/RichTextRender.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { onePostQuery, postQuery } from "@/api/query";
import type { Post, Tag } from "@/types";

export default function BlogDetailPage() {
  // const {postId} =useParams();

  // const post= posts.find((post)=>post.id ===postId)
  const imgUrl = import.meta.env.VITE_IMG_URL;
  const { postId } = useLoaderData();
  const { data: postData } = useSuspenseQuery(postQuery("?limit=6"));
  const { data: postDetail } = useSuspenseQuery(onePostQuery(postId));
  return (
    <>
      <div className="container mx-auto px-7 lg:px-0 max-w-screen-xl mt-8">
        <section className="flex flex-col lg:flex-row">
          <section className="mb-8 w-full lg:w-3/4 lg:pr-16">
            <Button variant="outline" className="mb-8" asChild>
              <Link to="/blogs">
                <ArrowLeft />
                All Posts
              </Link>
            </Button>
            {postDetail.post ? (
              <>
                <h3 className="line-clamp-1 ml-4 font-bold text-3xl">
                  {postDetail.post.title}
                </h3>
                <div className="ml-4 mt-2 text-sm">
                  <span>
                    by
                    <span className="font-semibold">
                      {" "}
                      {postDetail.post.author.fullName}
                    </span>
                    <span className="font-semibold">
                      {" "}
                      on {postDetail.post.updatedAt}
                    </span>
                  </span>
                </div>
                <h3 className="ml-4 font-[400] my-6">
                  {postDetail.post.content}
                </h3>
                <img
                  src={imgUrl + postDetail.post.image}
                  alt=""
                  className="w-full rounded-xl"
                  loading="lazy"
                  decoding="async"
                />
                <RichTextRender
                  content={postDetail.post.body}
                  className="mt-8"
                />
                <div className="mt-8 space-x-2">
                  {postDetail.post.tags.map((tag: Tag) => (
                    <Button variant="secondary" className="px-4" key={tag.name}>
                      {tag.name}
                    </Button>
                  ))}
                </div>
              </>
            ) : (
              <p className="mb-16 mt-8 text-center text-xl font-bold text-muted-foreground lg:mt-24 ">
                No post found
              </p>
            )}
          </section>
          <section className="w-full lg:w-1/4 lg:mt-24">
            <div className="flex space-x-2 items-center mb-6">
              <LayersIcon className="size-5" />
              <h3 className="">Other Blog Posts</h3>
            </div>
            <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-1">
              {postData?.posts.map((post: Post) => (
                <Link
                  to={`/blogs/${post.id}`}
                  className="flex space-x-2 space-y-6"
                  key={post.id}
                >
                  <img
                    src={imgUrl + post.image}
                    alt=""
                    className="w-1/4 rounded"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="w-3/4 text-sm font-[500] text-muted-foreground">
                    <p className="line-clamp-2">{post.content}</p>
                    <i>...See more</i>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </section>
      </div>
    </>
  );
}
