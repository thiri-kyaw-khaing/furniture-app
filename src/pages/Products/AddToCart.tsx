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
const quantitySchema = z.object({
  number: z.number().min(1).max(4, "too many items"),
});

export default function AddToCart({ showBuyNow }: { showBuyNow?: boolean }) {
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof quantitySchema>>({
    resolver: zodResolver(quantitySchema),
    defaultValues: {
      number: 1, // Default quantity
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof quantitySchema>) {
    console.log(values);
  }
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
          >
            <MinusIcon className="size-3" />
          </Button>
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem className="relative space-y-0">
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    {...field}
                    className="h-8 w-16 rounded-none border-x-0"
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
            Add to Cart
          </Button>
        </div>
      </form>
    </Form>
  );
}
