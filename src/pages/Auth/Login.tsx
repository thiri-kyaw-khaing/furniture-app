import { Link } from "react-router-dom";
import Banner from "@/data/images/house.webp";
import LoginForm from "@/components/auth/Login-form";
import { ShoppingBasket } from "lucide-react";

export default function Login() {
  return (
    <div className="relative">
      <Link
        to="/"
        className="absolute top-6 left-8 flex items-center gap-2 text-lg font-bold text-foreground/80 hover:text-foreground transion-colors"
      >
        <ShoppingBasket />
        <span>Furniture Shop</span>
      </Link>
      <main className="grid min-h-screen grid-col-1 lg:grid-cols-2 gap-10">
        <div className="flex w-full items-center justify-center">
          <LoginForm />
        </div>
        <div className="relative hidden lg:block w-full h-full">
          <img
            src={Banner}
            alt="FurnitureShop"
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
      </main>
    </div>
  );
}
