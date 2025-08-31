"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { toast } from "sonner"
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Category } from "@/types";

interface FilterProps {
  categories: Category[];
  types: Category[];
}

interface ProductFilterProps {
  filterList: FilterProps;
  seletedCategory: string[];
  seletedType: string[];
  onFilterChange: (category: string[], type: string[]) => void;
}

const FormSchema = z.object({
  categories: z.array(z.string()),
  // .refine((value) => value.some((item) => item), {
  //   message: "You have to select at least one item.",
  // }),
  types: z.array(z.string()),
  // .refine((value) => value.some((item) => item), {
  //   message: "You have to select at least one item.",
  // }),
});

export default function ProductFilter({
  filterList,
  seletedCategory,
  seletedType,
  onFilterChange,
}: ProductFilterProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categories: seletedCategory, //data.categories
      types: seletedType, //data.types
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast("You submitted the following values", {
    //     description: (
    //         <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
    //   <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    // </pre>
    //     ),
    // })
    onFilterChange(data.categories, data.types);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="categories"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Furnitures made by</FormLabel>
                {/*<FormDescription>*/}
                {/*    Select the items you want to display in the sidebar.*/}
                {/*</FormDescription>*/}
              </div>
              {(filterList?.categories ?? []).map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="categories"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-center gap-2"
                      >
                        <FormControl className="container">
                          <Checkbox
                            className=""
                            checked={field.value?.includes(item.id.toString())}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...field.value,
                                    item.id.toString(),
                                  ])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id.toString()
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal ">
                          {item.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="types"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Furnitures types</FormLabel>
                {/*<FormDescription>*/}
                {/*    Select the items you want to display in the sidebar.*/}
                {/*</FormDescription>*/}
              </div>
              {(filterList?.types ?? []).map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="types"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-center gap-2"
                      >
                        <FormControl className="container">
                          <Checkbox
                            className=""
                            checked={field.value?.includes(item.id.toString())}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...field.value,
                                    item.id.toString(),
                                  ])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id.toString()
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal ">
                          {item.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Filter</Button>
      </form>
    </Form>
  );
}
