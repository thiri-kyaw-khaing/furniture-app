// import  RegisterForm from "@/components/auth/Register-form";
import RegisterForm from "@/components/auth/Register-form";
import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="relative">
      <Link to="/">
        <div className="absolute top-6 left-8 flex items-center justify-center gap-3">
          <ShoppingBasket />
          <span className="font-bold">Furniture Shop</span>
        </div>
      </Link>
      <div className="flex w-full items-center h-screen justify-center">
        <RegisterForm />
      </div>
    </div>
  );
}
