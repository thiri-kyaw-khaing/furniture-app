import { ShoppingBasketIcon } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
const FormSchema = z.object({
  phone: z
    .string()
    .min(7, "phone number is too short")
    .max(12, "phone number is too long")
    .regex(/^\d+$/, "phone number must be numbers"),
});

export default function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const submit = useSubmit();
  const navigation = useNavigation().state === "submitting";
  const actionData = useActionData() as {
    error?: string;
    message?: string;
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
    },
  });
  function onSubmit(values: z.infer<typeof FormSchema>) {
    // console.log(values);
    // setLoading(true);
    // Call api
    submit(values, { method: "POST", action: "." });
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
          <h1 className="text-xl font-bold">Reset Password</h1>
          <div className="text-center text-sm">
            Remember your password?{" "}
            <Link to="/login" className="underline underline-offset-4">
              Sign In
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <Form {...form}>
            <div className="">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid w-full pr-8 lg:pr-0"
                autoComplete="off"
              >
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="0855******"
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
            <div className="">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid w-full pr-8 lg:pr-0 mb-10"
                autoComplete="off"
              >
                {actionData && (
                  <p className="text-xs text-red-500">{actionData?.message}</p>
                )}
                <div className="">
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full">
                      {navigation ? "Submitting..." : "Reset"}
                    </Button>
                    <Button variant="outline" className="w-full">
                      Sign Up with Google
                    </Button>
                  </div>
                </div>
                {/* <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div> */}
              </form>
            </div>
          </Form>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Button variant="outline" type="button" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                fill="currentColor"
              />
            </svg>
            Continue with Apple
          </Button>
          <Button variant="outline" type="button" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Continue with Google
          </Button>
        </div>
      </div>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
