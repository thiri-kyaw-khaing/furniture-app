import { cn } from "@/lib/utils.ts";
import { Button, type ButtonProps } from "@/components/ui/button.tsx";
import { HeartIcon } from "lucide-react";
import { HeartFilledIcon } from "@radix-ui/react-icons";

interface FavProps extends ButtonProps {
  productId: string;
  rating: number;
}

export default function AddtoFav({
  productId,
  rating,
  className,
  ...props
}: FavProps) {
  return (
    <Button
      variant={"secondary"}
      size={"icon"}
      className={cn("size-8 shrink-0", className)}
      {...props}
    >
      {/* <HeartIcon className="size-4"/> */}
      <HeartFilledIcon className="size-4 text-red-500" />
    </Button>
  );
}
