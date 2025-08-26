import {Link, useParams} from "react-router-dom";
import {products} from "@/data/product.ts";
import {Button} from "@/components/ui/button.tsx";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import ProductCard from "@/pages/Products/ProductCard.tsx";
import {ArrowLeftIcon} from "@radix-ui/react-icons";
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {Separator} from "@radix-ui/react-separator";
import Rating from "@/pages/Products/Rating.tsx";
import AddtoFav from "@/pages/Products/AddToFav.tsx";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"



    export default function ProductDetail() {
        const {productId} = useParams<{ productId: string }>();
        const product = products.find((product) => product.id === productId)

        const plugin = React.useRef(
            Autoplay({ delay: 2000, stopOnInteraction: true })
        )

        return (
            <div className="container mx-auto  max-w-screen-xl px-4 md:px-0 py-8">
                <Button className="mb-8" variant={"outline"} asChild>
                    <Link to="/products" className="flex items-center gap-2 ml-8">
                        <ArrowLeftIcon/> All Products</Link>
                </Button>
                <section className="flex flex-col gap-8 md:flex-row md:gap-16">
                    <Carousel
                        plugins={[plugin.current]}
                        className=" px-8 w-full md:w-1/2"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                    >
                        <CarouselContent>
                            {product?.images.map((image) => (

                                <CarouselItem key={image.id}>
                                    <div className="p-1  w-full">
                                        <img src={image.path} alt="" className="w-full h-full rounded-md object-cover"/>

                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>


                    </Carousel>
                    <Separator className="mt-4 md:hidden"/>
                    <div className="ml-8 w-full flex flex-col gap-4 md:w-1/2 ">
                        <h2 className="font-bold text-2xl mb-2 line-clamp-1">
                            {product?.name}
                        </h2>
                        <p className="text-base text-muted-foreground">
                            ${Number(product?.price)}
                        </p>
                        <Separator className="my-1.5"/>


                        <p className="text-base text-muted-foreground">{product?.inventory} in stock</p>
                        <div className="flex items-center justify-between">
                            <Rating rating={Number(product?.rating)} />
                            <AddtoFav productId={product?.id ?? ''} rating={product?.rating ?? 0} />
                        </div>
                        <Separator className="my-1.5"/>
                        <div>
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                                defaultValue="item-1"
                            >
                                <AccordionItem value="item-1" className="border-none">
                                    <AccordionTrigger>Description</AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-4 text-balance">
                                        {product?.description ?? "No description for this product"}
                                    </AccordionContent>
                                </AccordionItem>

                            </Accordion>
                        </div>
                    </div>

                </section>
                <section className="space-y-6">
                    <h2 className="line-clamp-1 text-2xl font-bold px-8">More Products from Furniture Shop</h2>
                    <ScrollArea className="pb-4 px-8">
                        <div className="flex gap-4">
                            {products.slice(0, 4).map((item) => (
                                <ProductCard product={item} key={item.id} className="min-w-[260px]"/>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal"/>
                    </ScrollArea>
                </section>
            </div>
        )

    }