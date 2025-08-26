import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import {cartItems} from "@/data/carts.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import CartItem from "@/pages/Products/CartItem.tsx";
import Editable from "@/pages/Products/Editable.tsx";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {Separator} from "@radix-ui/react-separator";
import {Link} from "react-router-dom";

export default function CartSheet() {
    const itemCount=4;
    const amountTotal=190;
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                    <Badge variant="destructive" className="absolute -right-2 -top-2 size-6 justify-center rounded-full text-white">
                        {itemCount}
                    </Badge>
                    <ShoppingCart className="size-4"/>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full md:max-w-lg flex h-full flex-col">
                <SheetHeader className="mb-2">
                    <SheetTitle className=" font-medium">Cart - {itemCount}</SheetTitle>
                </SheetHeader>
                <Separator/>
                {cartItems.length > 0 ? (
                    <>
                        <ScrollArea className="my-4 h-[80vh]">
                            <div className="flex-1">
                                {cartItems.map((cart)=>
                                    <CartItem cart={cart} key={cart.id}/>

                                )}
                            </div>

                        </ScrollArea>
                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Taxes</span>
                                <span>Calculated at Checkout</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Total</span>
                                <span>${amountTotal}</span>
                            </div>
                        </div>

                    <SheetFooter>
                    <Button type="submit" asChild>
                    <Link to='/checkout'>
                    Continue to CheckOut
                    </Link>
                    </Button>

                    </SheetFooter>
                    </>

                    ) : (
                    <div className="flex h-full flex-col items-center justify-center">
                        <ShoppingCart className="mb-4 size-16 "/>
                        <div className="text-xl text-muted-foreground font-medium">
                            Your cart is empty.
                        </div>
                    </div>
                )}

            </SheetContent>
        </Sheet>
    )
}