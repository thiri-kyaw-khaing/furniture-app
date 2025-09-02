"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MinusIcon, PlusIcon, ShoppingBasketIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useEffect } from "react";
const quantitySchema = z.object({
  quantity: z
    .string()
    .min(1, "Must not be empty")
    .max(4, "Too Many! Is it real?")
    .regex(/^\d+$/, "Must be a number"),
});

interface AddToCartProps {
  showBuyNow?: boolean;
  onHandleUpdate: (quantity: number) => void;
  idInCart: number;
}

export default function AddToCart({
  showBuyNow,
  onHandleUpdate,
  idInCart,
}: AddToCartProps) {
  const cartItem = useCartStore((state) =>
    state.carts.find((item) => item.id === idInCart)
  );
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof quantitySchema>>({
    resolver: zodResolver(quantitySchema),
    defaultValues: {
      quantity: cartItem ? cartItem.quantity.toString() : "1", // Default quantity
    },
  });

  const { setValue, watch } = form;
  const currentQuantity = Number(watch("quantity"));

  useEffect(() => {
    if (cartItem) {
      setValue("quantity", cartItem.quantity.toString(), {
        shouldValidate: true,
      });
    }
  }, [cartItem, setValue]);

  const handleDecrease = () => {
    const newQuantity = Math.max(currentQuantity - 1, 0); // Min limit 0
    setValue("quantity", newQuantity.toString(), { shouldValidate: true });
    // onUpdate(newQuantity);
  };

  const handleIncrease = () => {
    const newQuantity = Math.min(currentQuantity + 1, 9999); // Max limit 9999
    setValue("quantity", newQuantity.toString(), { shouldValidate: true });
    // onUpdate(newQuantity);
  };

  // });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof quantitySchema>) {
    //
    onHandleUpdate(Number(values.quantity));
  }
  // const { setValue, watch } = form;
  // const currentQuantity = Number(watch("quantity"));

  // useEffect(() => {
  //   if (cartItem) {
  //     setValue("quantity", cartItem.quantity.toString(), {
  //       shouldValidate: true,
  //     });
  //   }
  // }, [cartItem, setValue]);

  // useEffect(() => {
  //   if (cartItem && cartItem.quantity.toString() !== form.getValues("quantity")) {
  //     setValue("quantity", cartItem.quantity.toString(), {
  //       shouldValidate: true,
  //     });
  //   }
  //   // Only run when cartItem changes, not on every render
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [cartItem]);

  // useEffect(() => {
  //   const currentFormQuantity = form.getValues("quantity");
  //   if (cartItem && cartItem.quantity.toString() !== currentFormQuantity) {
  //     setValue("quantity", cartItem.quantity.toString(), {
  //       shouldValidate: true,
  //     });
  //   }
  //   // Only run when cartItem changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [cartItem]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-[260px] flex-col gap-4"
      >
        <div className="flex items-center">
          <Button
            className="size-8 shrink-0 rounded-r-none"
            type="button"
            variant={"outline"}
            size={"icon"}
            onClick={handleDecrease}
            disabled={currentQuantity <= 1}
          >
            <MinusIcon className="size-3" />
          </Button>
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="relative space-y-0">
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={9999}
                    {...field}
                    className="h-8 w-16 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none  [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="size-8 shrink-0 rounded-l-none"
            type="button"
            variant={"outline"}
            size={"icon"}
            onClick={handleIncrease}
            disabled={currentQuantity >= 9999}
          >
            <PlusIcon className="size-3" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            size="sm"
            className={cn(
              "w-[130px] text-white bg-black",
              showBuyNow ? "" : "hidden"
            )}
          >
            Buy Now
          </Button>
          <Button
            type="submit"
            size="sm"
            variant={showBuyNow ? "outline" : "default"}
            className="w-[130px] text-black"
          >
            <ShoppingBasketIcon />
            {cartItem ? "Update Cart" : "Add to Cart"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
