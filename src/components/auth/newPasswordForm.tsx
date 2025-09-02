import { ShoppingBasketIcon } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "./passwordInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  useSubmit,
  useNavigation,
  useActionData,
  Link,
} from "react-router-dom";
import { useState } from "react";
const FormSchema = z.object({
  password: z
    .string()
    .min(8, "password must be 8 digits")
    .max(8, "password must be 8 digits")
    .regex(/^\d+$/, "password must be numbers"),

  confirmPassword: z
    .string()
    .min(8, "password must be 8 digits")
    .max(8, "password must be 8 digits")
    .regex(/^\d+$/, "password must be numbers"),
});

export default function NewPassword({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const submit = useSubmit();
  const navigation = useNavigation().state === "submitting";
  const actionData = useActionData() as {
    error?: string;
    message?: string;
  };

  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  function onSubmit(values: z.infer<typeof FormSchema>) {
    if (values.password !== values.confirmPassword) {
      setError("New Passwords do not match");
      return;
    }
    setError(null);
    // console.log(values);
    // setLoading(true);
    // Call api
    submit(values, { method: "POST", action: "/reset/new-password" });
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <a href="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex size-10 items-center justify-center rounded-md">
              <ShoppingBasketIcon className="h-8 w-8 mr-2" />
            </div>
            <span className="sr-only">Acme Inc.</span>
          </a>
          <h1 className="text-xl font-bold">Change New Password</h1>
          <div className="text-center text-sm">
            New Password must be 8 digits and contain only numbers.They must
            match.
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <Form {...form}>
            <div className="mb-6">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid w-full pr-8 lg:pr-0"
                autoComplete="off"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="********"
                          required
                          inputMode="numeric"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid w-full pr-8 lg:pr-0 mt-3"
                autoComplete="off"
              >
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          type="password"
                          placeholder="********"
                          required
                          inputMode="numeric"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </div>
            <div className="mb-6">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid w-full pr-8 lg:pr-0 mb-10"
                autoComplete="off"
              >
                {actionData && (
                  <div className="flex gap-2">
                    <p className="text-xs text-red-500">
                      {actionData?.message}
                    </p>
                    <Link to="/login" className="text-xs underline">
                      Go Back to Login
                    </Link>
                  </div>
                )}
                {error && <p className="text-xs text-red-500">{error}</p>}
                <div className="">
                  <div className="flex flex-col">
                    <Button type="submit" className="w-full">
                      {navigation ? "Submitting..." : "Change Password"}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
