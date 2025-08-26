import {posts} from "@/data/posts.ts";
import {Button} from "@/components/ui/button.tsx";
import {useParams,Link} from "react-router-dom";
import {ArrowLeft, LayersIcon} from "lucide-react";
import RichTextRender from "@/pages/blogs/RichTextRender.tsx";

export default function BlogDetailPage(){

    const {postId} =useParams();
    const post= posts.find((post)=>post.id ===postId)
    return (
        <>
            <div className="container mx-auto px-7 lg:px-0 max-w-screen-xl mt-8">
                <section className="flex flex-col lg:flex-row">
                    <section className="mb-8 w-full lg:w-3/4 lg:pr-16">
                        <Button variant="outline" className="mb-8" asChild>
                            <Link to="/blogs">
                                <ArrowLeft/>All Posts
                            </Link>
                        </Button>
                        {post?(
                            <>

                                <h3 className="line-clamp-1 ml-4 font-bold text-3xl">{post.title}</h3>
                                <div className="ml-4 mt-2 text-sm">
                                    <span>by<span className="font-semibold"> {post.author}</span><span className="font-semibold"> on {post.updatedAt}</span></span>
                                </div>
                                <h3 className="ml-4 font-[400] my-6">{post.content}</h3>
                                <img src={post.image} alt="" className="w-full rounded-xl"/>
                                <RichTextRender content={post.body} className="mt-8"/>
                                <div className="mt-8 space-x-2">
                                    {post.tags.map((tag)=>(
                                        <Button variant="secondary" className="px-4">{tag}</Button>
                                        ))}
                                </div>
                            </>
                            ):(
                            <p className="mb-16 mt-8 text-center text-xl font-bold text-muted-foreground lg:mt-24 ">No post found</p>
                        )}
                    </section>
                    <section className="w-full lg:w-1/4 lg:mt-24">
                        <div className="flex space-x-2 items-center mb-6">
                            <LayersIcon className="size-5"/>
                            <h3 className="">Other Blog Posts</h3>
                        </div>
                        <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-1">
                            {posts.map((post)=>(
                                <Link to={`/blogs/${post.id}`} className="flex space-x-2 space-y-6">
                                    <img src={post.image} alt="" className="w-1/4 rounded"/>
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
    )
}