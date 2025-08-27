import { postQuery, productQuery } from "@/api/query";
import Couch from "@/data/images/couch.png";
import { Button } from "@/components/ui/button";
import CarouselCard from "@/components/CarouselCard";
import BlogCard from "@/pages/blogs/BlogCard";
import ProductCard from "@/pages/Products/ProductCard";
import { Link } from "react-router-dom";
import type { Product } from "@/types";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

// import { Skeleton } from "@/components/ui/skeleton";

function Home() {
  // const { productData, postData } = useLoaderData();

  // const {
  //   data: productData,
  //   isLoading: isLoadingProduct,
  //   isError: isErrorProduct,
  //   error: errorProduct,
  //   refetch: refetchProduct,
  // } = useQuery(productQuery("?limit=8"));
  // const {
  //   data: postData,
  //   isLoading: isLoadingPost,
  //   isError: isErrorPost,
  //   error: errorPost,
  //   refetch: refetchPost,
  // } = useQuery(postQuery("?limit=3"));

  // if (isLoadingProduct || isLoadingPost) {
  //   return <p className="text-center">Loading...</p>;
  // }

  // if (isErrorPost || isErrorProduct) {
  //   return (
  //     <div className="container mx-auto my-32 flex flex-1">
  //       <div className="text-red text-center">
  //         <p className="text-center">
  //           {errorPost?.message} & {errorProduct?.message}
  //         </p>
  //         <Button
  //           onClick={() => {
  //             refetchPost();
  //             refetchProduct();
  //           }}
  //           variant={"secondary"}
  //         >
  //           Retry
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }
  const { data: productData } = useSuspenseQuery(productQuery("?limit=8"));
  const { data: postData } = useSuspenseQuery(postQuery("?limit=3"));

  const Title = ({
    title,
    href,
    sideText,
  }: {
    title: string;
    href: string;
    sideText: string;
  }) => (
    <div className="mb-10 mt-28 flex flex-col px-4 md:flex-row md:justify-between md:px-0">
      <h2 className="mb-4 text-2xl font-bold md:mb-0">{title}</h2>
      <Link to={href} className="font-semibold text-muted-foreground underline">
        {sideText}
      </Link>
    </div>
  );

  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        {/* Text Section */}
        <div className="my-8 text-center lg:mb-0 lg:mt-16 lg:w-2/5 lg:text-left">
          <h1 className="mb-4 text-4xl font-extrabold text-own lg:mb-8 lg:text-6xl">
            Modern Interior Design Studio
          </h1>
          <p className="mb-6 text-own lg:mb-8">
            Furniture is an essential component of any living space, providing
            functionality, comfort, and aesthetic appeal.
          </p>
          <div>
            <Button
              asChild
              className="mr-2 rounded-full bg-orange-300 px-8 py-6 text-base font-bold"
            >
              <Link to="#">Shop Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full px-8 py-6 text-base font-bold text-own"
            >
              <Link to="#">Explore</Link>
            </Button>
          </div>
        </div>
        {/* Image Section */}
        <img src={Couch} alt="Couch" className="w-full lg:w-3/5" />
      </div>
      <CarouselCard products={productData.products} />
      <Title
        title="Featured Products"
        href="/products"
        sideText="View All Products"
      />
      <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-0 lg:grid-cols-4">
        {productData.products.slice(0, 4).map((p: Product) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
      <Title title="Recent Blog" href="/blogs" sideText="View All Posts" />
      <BlogCard posts={postData.posts} />
    </div>
  );
}

export default Home;
