import {StarIcon} from "lucide-react";
import {cn} from "@/lib/utils.ts";


interface RatingProps {
    rating:number
}
export default function Rating({rating}:RatingProps ){
    return (
        <div className={cn(" flex items-center space-x-1")}>
            {Array.from({length:5}).map((_,index)=>(
                    <StarIcon key={index} className={cn("size-4", rating >=index+1? "text-yellow" : "text-muted-foreground")}/>
                ))}
        </div>
    )
}