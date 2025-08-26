import {cn} from "@/lib/utils.ts";
import {Button,type ButtonProps} from "@/components/ui/button.tsx";
import {HeartIcon} from "lucide-react";


interface FavProps extends ButtonProps{
    productId:string;
    rating:number;
}

export default function AddtoFav({productId,rating,className,...props}:FavProps){
    return(
    <Button variant={"secondary"} size={"icon"} className={cn("size-8 shrink-0",className)} {...props}>
        <HeartIcon className="size-4"/>
    </Button>
    )
}