import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site.ts";
import { ShoppingBasket } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t lg:ml-0 pl-8">
      <div className="container mx-auto pb-8 pt-6 lg:py-6 w-full max-w-screen-xl">
        <section className="flex flex-col lg:flex-row gap-10 lg:gap-20 mr-5">
          <section className="">
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingBasket />

              <span className="font-bold">{siteConfig.name}</span>
            </Link>
          </section>

          <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-10">
            {siteConfig.footerNav.map((tit) => (
              <div>
                <h4 className="font-bold text-lg mb-4" key={tit.title}>
                  {tit.title}
                </h4>
                <ul>
                  {tit.items.map((item) => (
                    <li>
                      <Link
                        to={String(item.href)}
                        target={item.external ? "_blank" : undefined}
                        className="text-muted-foreground text-sm hover:text-foreground"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </section>
      </div>
    </footer>
  );
}
