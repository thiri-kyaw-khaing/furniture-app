import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import Footer from "@/components/Footer.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import Header from "@/components/Header.tsx";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex flex-1 items-center  my-32 mb-8  mt-20">
        <Card className="w-[350px] md:w-[500px] lg:w-[500px]">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center w-12 h-12 mx-auto bg-red-500 rounded-full">
              <ExclamationTriangleIcon />
            </div>
            <CardTitle>Oops!</CardTitle>
            <CardDescription>An error occurs accidently</CardDescription>

            <Link to="/">
              <Button>Go Home</Button>
            </Link>
          </CardHeader>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
