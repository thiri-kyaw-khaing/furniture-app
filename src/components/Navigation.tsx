import type { MainNavItem } from "@/types";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  // NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { ShoppingBasket } from "lucide-react";
import { siteConfig } from "@/config/site.ts";

interface MainNavProps {
  items?: MainNavItem[];
}

export default function Navigation({ items }: MainNavProps) {
  return (
    <div className="hidden lg:flex gap-6">
      <Link to="/" className="items-center space-x-2 flex">
        <ShoppingBasket className="size-4" />
        <span className="font-bold inline-block">{siteConfig.name}</span>
      </Link>

      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          {items?.[0]?.card && (
            <NavigationMenuItem>
              <NavigationMenuTrigger>{items[0].title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                        to="/"
                      >
                        <div className="mt-4 mb-2 text-lg font-medium">
                          shadcn/ui
                        </div>
                        <p className="text-muted-foreground text-sm leading-tight">
                          {siteConfig.description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {items[0].card.map((item) => (
                    <ListItem
                      href={String(item.href)}
                      title={item.title}
                      key={item.title}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}

          {items?.[0].menu &&
            items[0].menu.map((item) => (
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                  key={item.title}
                >
                  <Link to={String(item.href)}>{item.title}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
ListItem.displayName = "ListItem";
