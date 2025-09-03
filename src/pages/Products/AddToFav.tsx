import { cn } from "@/lib/utils.ts";
import { Button, type ButtonProps } from "@/components/ui/button.tsx";
import { HeartIcon } from "lucide-react";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { useFetcher } from "react-router-dom";

interface FavProps extends ButtonProps {
  productId: string;
  rating: number;
  isFavourite: boolean;
}

export default function AddtoFav({
  productId,
  isFavourite,
  //   rating,
  className,
  ...props
}: FavProps) {
  const fetcher = useFetcher({ key: `product:${productId}` });
  return (
    <fetcher.Form method="POST">
      <Button
        variant={"secondary"}
        size={"icon"}
        name="favourite"
        value={isFavourite ? "false" : "true"}
        className={cn("size-8 shrink-0", className)}
        {...props}
      >
        {isFavourite ? (
          <HeartFilledIcon className="size-4 text-red-500" />
        ) : (
          <HeartIcon className="size-4 text-red-500" />
        )}
        {/* <HeartIcon className="size-4"/> */}
      </Button>
    </fetcher.Form>
  );
}
