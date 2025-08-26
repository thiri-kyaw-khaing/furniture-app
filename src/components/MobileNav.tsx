import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import type {MainNavItem} from "@/types";
import {MenuIcon, ShoppingBasket} from "lucide-react";
import {Link} from "react-router-dom";
import {siteConfig} from "@/config/site.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";


interface MainNavProps   {
    items?: MainNavItem[];
}


export default function MobileNav({items}:MainNavProps) {
        return (
            <div className="lg:hidden flex">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="ml-4"><MenuIcon/></Button>
                    </SheetTrigger>
                    <SheetContent side={"left"} className="pl-5 pr-0 pt-11">
                        <SheetClose>
                            <div className="flex">
                                <Link to='/' className="mr-3">
                                    <ShoppingBasket/>
                                </Link>
                                <span>{siteConfig.name}</span>
                            </div>
                        </SheetClose>
                        <ScrollArea className="my-4 h-[calc(100vh-11rem)]">
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                                defaultValue="item-1"
                            >
                                {items?.[0]?.card && (
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>{items?.[0].title}</AccordionTrigger>
                                        <AccordionContent className="flex flex-col gap-4 text-balance">
                                            {items[0]?.card.map((item)=>(
                                                <SheetClose>
                                                    <div className=" ml-4 flex">
                                                        <Link to={String(item.href)}  className="mr-3">
                                                            {item.title}
                                                        </Link>
                                                    </div>
                                                </SheetClose>
                                            ))}
                                        </AccordionContent>
                                    </AccordionItem>

                                )}
                            </Accordion>
                            <div className="space-y-3">
                                {items?.[0]?.menu  && (
                                    items[0].menu.map((item) => (
                                        <SheetClose key={item.title} className="flex flex-col space-y-3">
                                            <div className="flex flex-col space-y-3">
                                                <Link to={String(item.href)} className="mr-3 space-y-3">
                                                    {item.title}
                                                </Link>
                                            </div>
                                        </SheetClose>
                                    ))
                                )}
                            </div>


                        </ScrollArea>

                    </SheetContent>
                </Sheet>
            </div>
        )
}