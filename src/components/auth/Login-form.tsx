import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Link,
  useSubmit,
  useNavigation,
  useActionData,
} from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordInput } from "./passwordInput";
import {
  Form,
  FormControl,
  //FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  phone: z
    .string()
    .min(7, "phone number is too short")
    .max(12, "phone number is too long")
    .regex(/^\d+$/, "phone number must be numbers"),
  password: z
    .string()
    .min(8, "password must be 8 digits")
    .max(8, "password must be 8 digits")
    .regex(/^\d+$/, "password must be numbers"),
});

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  //to show loading/submitting
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  //for error message
  const actionData = useActionData() as {
    error?: string;
    message?: string;
  };
  //to submit form using action
  const submit = useSubmit();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    // console.log(values);
    // setLoading(true);
    // Call api
    submit(values, { method: "POST", action: "/login" });
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-100">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your phone number below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <div className="mb-6">
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
            <div className="mb-6">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid w-full pr-8 lg:pr-0 mb-10"
                autoComplete="off"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <Link
                          to="/reset"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <PasswordInput
                          required
                          inputMode="numeric"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {actionData && (
                  <p className="text-xs text-red-500">{actionData?.message}</p>
                )}
                <div className="mt-4">
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full">
                      {isSubmitting ? "Submitting..." : "Sign In"}
                    </Button>
                    <Button variant="outline" className="w-full">
                      Sign In with Google
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </form>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
