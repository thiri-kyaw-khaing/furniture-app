import Navigation from "@/components/Navigation.tsx";
import { siteConfig } from "@/config/site.ts";
import MobileNav from "@/components/MobileNav.tsx";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import AuthDropDown from "@/components/AuthDropDown.tsx";
import { User } from "@/data/user.ts";
import CartSheet from "@/pages/Products/CartSheet.tsx";
export default function Header() {
  return (
    <>
      <header className=" w-full border-b fixed z-50 bg-background">
        <nav className="container mx-auto flex items-center h-16 w-full max-w-screen-xl">
          <Navigation items={siteConfig.mainNav} />
          <MobileNav items={siteConfig.mainNav} />
          <div className="flex flex-1 justify-end mr-8 lg:mr-12 gap-4">
            <CartSheet />
            <ModeToggle />
            <AuthDropDown user={User} />
          </div>
        </nav>
      </header>
    </>
  );
}
