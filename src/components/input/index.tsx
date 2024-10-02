import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}


export function Input (props:InputProps) {
    return(
        <input className="h-9 border-0 rounded-md mb-3 px-2"
        {...props}
        />

    )
}