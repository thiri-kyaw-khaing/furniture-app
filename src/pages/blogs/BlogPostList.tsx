import type { Post } from "@/types";
import { Link } from "react-router-dom";

interface BlogPostListProps {
  posts: Post[];
}
const imgUrl = import.meta.env.VITE_IMG_URL;
export default function BlogPostList({ posts }: BlogPostListProps) {
  return (
    <div className="ml-4 grid grid-cols-1 md:grid-cols-2 md:gap-10 lg:grid-cols-3 gap-4 my-8">
      {posts.map((post) => (
        <Link to={`/blogs/${post.id}`} key={post.id} className="block">
          <div>
            <img
              src={imgUrl + post.image}
              alt=""
              className="w-full rounded-2xl mb-4"
            />
            <h3 className="line-clamp-1  text-xl font-extrabold mb-4">
              {post.title}
            </h3>
            <h2 className="line-clamp-3  font-[400] text-base">
              {post.content}
            </h2>
            <div className=" mt-2 text-sm">
              <span>
                by<span className="font-[600]"> {post.author.fullName}</span>
                <span className="font-semibold"> on {post.updatedAt}</span>
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
