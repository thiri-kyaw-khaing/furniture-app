// import { Link, useLoaderData } from "react-router-dom";
// import Couch from "@/data/images/couch.png";
// import { Button } from "@/components/ui/button.tsx";
// import CarouselCard from "@/components/CarouselCard.tsx";
// import { products } from "@/data/product.ts";
// import BlogCard from "@/pages/blogs/BlogCard.tsx";
// import { posts } from "@/data/posts.ts";
// import ProductCard from "@/pages/Products/ProductCard.tsx";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { useSuspenseQuery } from "@tanstack/react-query";
// import { ProductQuery } from "@/api/query";
// import type { Product } from "@/types";

// const sampleProducts = products.slice(0, 4);
// export function Title({
//   title,
//   href,
//   sideText,
// }: {
//   title: string;
//   href: string;
//   sideText: string;
// }) {
//   return (
//     <div className="mt-28 mb-10 flex flex-col md:flex-row md:justify-between">
//       <h2 className="font-bold text-2xl mb-3 lg:mb-0">{title}</h2>
//       <Link to={href} className="underline text-sm text-muted-foreground">
//         {sideText}
//       </Link>
//     </div>
//   );
// }
// export default function Home() {
//   const { data: products } = useSuspenseQuery(ProductQuery("?limit=8"));
//   const { data: posts } = useSuspenseQuery(ProductQuery("?limit=3"));
//   return (
//     <div className="container mx-auto  mt-16 px-4 w-full max-w-screen-xl">
//       <div className="flex flex-col   justify-between lg:flex-row gap-10 ">
//         {/*Text Section*/}
//         <div className=" my-8 text-center lg:mt-16 lg:mb-0 lg:text-left">
//           <h1 className="text-4xl font-extrabold mb-4 lg:mb-8 lg:text-6xl text-[#3b5d50]">
//             Modern Interior Design Studio
//           </h1>
//           <p className="text-lg text-[#3b5d50] mb-8">
//             Furniture is an essential component of any living space, providing a
//             comfortable and functional environment.
//           </p>
//           <div className="space-x-4">
//             <Button
//               asChild
//               className="rounded-full bg-orange-300 px-8 py-6 text-base font-bold"
//             >
//               <Link to="">Shop Now</Link>
//             </Button>
//             <Button
//               asChild
//               variant="outline"
//               className="rounded-full px-8 py-6 text-[#3b5d50] font-bold"
//             >
//               <Link to="">Explore</Link>
//             </Button>
//           </div>
//           {/*    image section*/}
//         </div>
//         <div className="">
//           <img src={Couch} className="w-full " />
//         </div>
//       </div>
//       {/*Product Carousel*/}
//       <CarouselCard products={products.products} />
//       {/*Product Post*/}
//       <Title
//         title="Featured Products"
//         href="/products"
//         sideText="View All Products"
//       />
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
//         {/* {sampleProducts.map((p) => (
//           <ProductCard key={p.id} product={p} />
//         ))} */}
//         {products.products.map((p: Product) => (
//           <ProductCard key={p.id} product={p} />
//         ))}
//       </div>

//       {/*Blog Post*/}
//       <Title title="Recent Blog" href="/blogs" sideText="View All Posts" />
//       <BlogCard posts={posts} />
//     </div>
//   );
// }

import { Link, useLoaderData } from "react-router";

import { posts } from "@/data/posts.ts";
import Couch from "@/data/images/couch.png";
import { Button } from "@/components/ui/button";
import CarouselCard from "@/components/CarouselCard";
import BlogCard from "@/pages/blogs/BlogCard";
import ProductCard from "@/pages/Products/ProductCard";

import { products } from "@/data/product";
import type { Product } from "@/types";

// import { Skeleton } from "@/components/ui/skeleton";

function Home() {
  const { productData, postData } = useLoaderData();

  // const {
  //   data: productsData,
  //   isLoading: isLoadingProduct,
  //   isError: isErrorProduct,
  //   error: errorProduct,
  //   refetch: refetchProduct,
  // } = useQuery(productQuery("?limit=8"));
  // const {
  //   data: postsData,
  //   isLoading: isLoadingPost,
  //   isError: isErrorPost,
  //   error: errorPost,
  //   refetch: refetchPost,
  // } = useQuery(postQuery("?limit=3"));

  // if (isLoadingProduct && isLoadingPost) {
  //   return (
  //     <div className="flex flex-col space-y-3">
  //       <Skeleton className="h-[125px] w-[250px] rounded-xl" />
  //       <div className="space-y-2">
  //         <Skeleton className="h-4 w-[250px]" />
  //         <Skeleton className="h-4 w-[200px]" />
  //       </div>
  //     </div>
  //   );
  // }

  // if (isErrorProduct && isErrorPost) {
  //   return (
  //     <div className="container mx-auto my-32 flex flex-1 place-content-center">
  //       <div className="text-center text-red-400">
  //         <p className="mb-4">
  //           {errorProduct.message} & {errorPost.message}
  //         </p>
  //         <Button
  //           onClick={() => {
  //             refetchProduct();
  //             refetchPost();
  //           }}
  //           variant="secondary"
  //         >
  //           Retry
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  // const { data: productsData } = useSuspenseQuery(productQuery("?limit=8"));
  // const { data: postsData } = useSuspenseQuery(postQuery("?limit=3"));

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
