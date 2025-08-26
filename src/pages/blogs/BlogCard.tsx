import type {Post} from "@/types";
import { Link } from "react-router-dom";

interface BlogCardProps{
    posts:Post[];
}


export default function BlogCard({posts}:BlogCardProps){
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
            {posts.map((post)=>(
                <Link to={`/blogs/${post.id}`} key={post.id} className="block">
                    <div>
                        <img src={post.image} alt="" className="w-full rounded-2xl mb-4"/>
                        <h3 className="line-clamp-1 ml-4 font-semibold">{post.title}</h3>
                        <div className="ml-4 mt-2 text-sm">
                            <span>by<span className="font-semibold"> {post.author}</span><span className="font-semibold"> on {post.updatedAt}</span></span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}