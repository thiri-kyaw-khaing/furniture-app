import DOMPurify from "dompurify";
import type {HTMLAttributes} from "react";

interface Props extends HTMLAttributes<HTMLDivElement>{
    content:string
}
export default  function RichTextRender({content,className}:Props){
    const sanitizedContent =DOMPurify.sanitize(content)
    return (
        <div dangerouslySetInnerHTML={{__html:sanitizedContent}}
        className={className}/>
    )
}