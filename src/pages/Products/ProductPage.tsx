import { filterList } from "@/data/product.ts";
import ProductCard from "@/pages/Products/ProductCard.tsx";
// import Pagination from "@/pages/Products/PaginationPage.tsx";
import ProductFilter from "@/pages/Products/ProductFilter.tsx";
import { useInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { CategoryTypeQuery, InfiniteProductQuery } from "@/api/query";
import { Button } from "@/components/ui/button";

// const { data: cateType } = useSuspenseQuery(CategoryTypeQuery());

export default function ProductPage() {
  const {
    data,
    status,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(InfiniteProductQuery());
  const allProducts = data?.pages.flatMap((page) => page.products) || [];
  return status === "pending" ? (
    <p>"Loading..."</p>
  ) : status === "error" ? (
    <p>{error.message}</p>
  ) : (
    <div className="container mx-auto  max-w-screen-xl ">
      <section className="flex flex-col lg:flex-row">
        <section className="my-8 ml-4 w-full lg:w-1/5 lg:ml-0">
          <ProductFilter filterList={filterList} />
        </section>
        <section className="w-full lg:w-4/5 my-6 ml-4 lg:ml-0">
          <h2 className="font-bold text-2xl">All Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4 mb-12">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {/* <Pagination /> */}
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
        </section>
      </section>
    </div>
  );
}
