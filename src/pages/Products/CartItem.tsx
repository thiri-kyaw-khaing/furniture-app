import type { Cart } from "@/types";
import Editable from "@/pages/Products/Editable.tsx";
const imgUrl = import.meta.env.VITE_IMG_URL;
interface CartItemProps {
  cart: Cart;
}

export default function cartItem({ cart }: CartItemProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <img src={imgUrl + cart.image} alt="" className="w-16" />
        <div className="flex space-y-1 flex-col">
          <span className="line-clamp-1 text-sm font-medium">{cart.name}</span>
          <span className="text-xs text-muted-foreground">{cart.price}</span>
          {/* <span className="line-clamp-1 text-xs capitalize">{cart.category}</span> */}
        </div>
      </div>
      <div className="mb-6">
        <Editable />
      </div>
    </div>
  );
}
