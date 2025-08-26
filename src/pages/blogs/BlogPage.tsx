import {posts} from "@/data/posts.ts";
import BlogPostList from "@/pages/blogs/BlogPostList.tsx";



export default function BlogPage(){
    return (
       <div className="container mx-auto max-w-screen-xl">
           <h2 className="mt-8 font-bold text-2xl text-center md:text-left md:ml-4 mb-3">Latest Blog Posts</h2>
            <BlogPostList posts={posts}/>
       </div>
    )
}