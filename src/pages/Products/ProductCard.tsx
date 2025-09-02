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
import { useCartStore } from "@/store/cartStore";
interface ProductProps extends HTMLAttributes<HTMLDivElement> {
  product: Product;
}

const imgUrl = import.meta.env.VITE_IMG_URL;
const AspectRatio = AspectRatioPrimitive.Root;

export default function ProductCard({ product, className }: ProductProps) {
  const { carts, addItem } = useCartStore();
  const cartItem = carts.find((item) => item.id === product.id);

  const cartHandler = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0].path,
      quantity: 1,
    });
  };
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
      <CardFooter className="p-4 pt-1">
        {product.status === "INACTIVE" ? (
          <Button
            size="sm"
            disabled={true}
            aria-label="Sold Out"
            className="h-8 w-full rounded-sm font-bold"
          >
            Sold Out
          </Button>
        ) : (
          <Button
            size="sm"
            className="h-8 w-full rounded-sm bg-black font-bold"
            onClick={cartHandler}
            disabled={!!cartItem}
          >
            {!cartItem && <PlusIcon className="" />}
            {!cartItem ? "Add To Cart" : "Added Item"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
