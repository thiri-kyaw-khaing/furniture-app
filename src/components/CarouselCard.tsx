import Autoplay from "embla-carousel-autoplay";
// import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Product } from "@/types";
import { Link } from "react-router-dom";

interface ProductProps {
  products: Product[];
}
const imgUrl = import.meta.env.VITE_IMG_URL;
export default function CarouselCard({ products }: ProductProps) {
  return (
    <Carousel
      className="w-full lg:col-3"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      {/* <CarouselContent className="ml-1">
        {products.map((product) => (
          <CarouselItem key={product.id} className="pl-1 lg:basis-1/3 flex">
            <div className="p-4 flex lg:px-4">
              <img
                src={imgUrl + product.images[0]?.path}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-50 h-25 rounded-md"
              />
            </div>
            <div className="">
              <h3 className="text-sm font-bold">{product.name}</h3>
              <p className="mt-2 text-sm text-gray-600">
                {product.description.length > 55
                  ? product.description.substring(0, 55) + "..."
                  : product.description}
              </p>
              <p>
                <Link
                  to={`/products/${product.id}`}
                  className="mt-3 text-sm font-semibold hover:underline"
                >
                  Read More
                </Link>
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent> */}
      <CarouselContent className="ml-1">
        {products.map((product) => (
          <CarouselItem key={product.id} className="pl-1 lg:basis-1/3 flex">
            <div className="p-4 flex lg:px-4">
              <img
                src={imgUrl + product.images[0].path}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="h-20 rounded-md"
              />
            </div>
            <div className="">
              <h3 className="text-sm font-bold">{product.name}</h3>
              <p className="mt-2 text-sm text-gray-600">
                {product.description.length > 55
                  ? product.description.substring(0, 55) + "..."
                  : product.description}
              </p>
              <p>
                <Link
                  to={`/products/${product.id}`}
                  className="mt-3 text-sm font-semibold hover:underline"
                >
                  Read More
                </Link>
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
