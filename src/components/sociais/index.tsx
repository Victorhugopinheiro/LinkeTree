import { ReactNode } from "react"

interface Sociais{
    url:string,
    children: ReactNode 

}


export function Sociais ({url, children}:Sociais) {

    return(
        <a href={url} rel="noopener noreferrer" target="_blank">
            {children}

        </a>
    )
}