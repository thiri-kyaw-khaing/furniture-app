// import { filterList } from "@/data/product.ts";
import ProductCard from "@/pages/Products/ProductCard.tsx";
// import Pagination from "@/pages/Products/PaginationPage.tsx";
import ProductFilter from "@/pages/Products/ProductFilter.tsx";
import { useInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  CategoryTypeQuery,
  InfiniteProductQuery,
  queryClient,
} from "@/api/query";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";

export default function ProductPage() {
  //url param eg.categories1,2&types1
  const [searchParam, setsearchParam] = useSearchParams();

  const rawCategory = searchParam.get("categories");
  const rawType = searchParam.get("types");
  //decode raw and validate(array)
  const seletedCategory = rawCategory
    ? decodeURIComponent(rawCategory)
        .split(",")
        .map((cat) => Number(cat.trim()))
        .filter((cat) => !isNaN(cat))
        .map((cat) => cat.toString())
    : [];
  const seletedType = rawType
    ? decodeURIComponent(rawType)
        .split(",")
        .map((type) => Number(type.trim()))
        .filter((type) => !isNaN(type))
        .map((cat) => cat.toString())
    : [];
  //parse array to string(parameter need to be string type)
  const cat = seletedCategory.length > 0 ? seletedCategory.join(",") : null;
  const type = seletedType.length > 0 ? seletedType.join(",") : null;

  const { data: cateType } = useSuspenseQuery(CategoryTypeQuery());
  console.log("Category Type Output:", cateType);
  const {
    data,
    status,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(InfiniteProductQuery(cat, type));

  const allProducts = data?.pages.flatMap((page) => page.products) || [];

  const handleFilterChange = (categories: string[], types: string[]) => {
    const newParam = new URLSearchParams();
    //parse param from url by encode to use
    if (categories.length > 0)
      newParam.set("categories", encodeURIComponent(categories.join(",")));
    if (types.length > 0)
      newParam.set("types", encodeURIComponent(types.join(",")));
    //update url and triggers refetch via query key
    setsearchParam(newParam);
    //cancel in-flight quries
    queryClient.cancelQueries({ queryKey: ["products", "infinite"] });
    //clear cache
    queryClient.removeQueries({ queryKey: ["products", "infinite"] });
    refetch();
  };

  return status === "pending" ? (
    <p>"Loading..."</p>
  ) : status === "error" ? (
    <p>{error.message}</p>
  ) : (
    <div className="container mx-auto  max-w-screen-xl ">
      <section className="flex flex-col lg:flex-row">
        <section className="my-8 ml-4 w-full lg:w-1/5 lg:ml-0">
          <ProductFilter
            filterList={cateType}
            seletedCategory={seletedCategory}
            seletedType={seletedType}
            onFilterChange={handleFilterChange}
          />
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
