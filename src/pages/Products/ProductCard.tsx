import type { Product } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
interface ProductProps extends HTMLAttributes<HTMLDivElement> {
  product: Product;
}
const imgUrl = import.meta.env.VITE_IMG_URL;
const AspectRatio = AspectRatioPrimitive.Root;

export default function ProductCard({ product, className }: ProductProps) {
  return (
    <Card
      className={cn("overflow-hidden rounded-lg flex flex-col p-8", className)}
    >
      <Link to={`/products/${product.id}`} className="flex-1 flex flex-col">
        <CardHeader className="border-b space-y-2">
          <AspectRatio ratio={1 / 1} className="bg-muted w-full">
            <img
              src={imgUrl + product.images[0]?.path}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="flex-1 mt-3">
          <p className="font-semibold">{product.name}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between space-x-2">
          <p>${product.price}</p>
          {product.discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ${product.discount}
            </span>
          )}
        </CardFooter>
      </Link>
      <Button size="sm" disabled={product.status === "sold"} className="m-2">
        {product.status === "sold" ? (
          "Sold Out"
        ) : (
          <>
            <PlusIcon className="w-4 h-4 mr-1" /> Add to Cart
          </>
        )}
      </Button>
    </Card>
  );
}
