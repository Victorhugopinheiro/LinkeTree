import { onAuthStateChanged } from "firebase/auth"
import{auth} from "../services/firebaseConnection"
import { ReactNode, useEffect, useState } from "react"
import {  Navigate } from "react-router-dom"


interface Rotas{
    children: ReactNode
}



export function Private ({children}:Rotas) :any {


    const [loading, setLoading] = useState(true)
    const [login, setLogin] = useState(false)

    useEffect(() => { 
        const onsub = onAuthStateChanged(auth, (user) => {
            if(user){
                const control = {
                    uid:user?.uid,
                    email: user?.email
                }

                localStorage.setItem("@login", JSON.stringify(control))
                setLoading(false)
                setLogin(true)

            }else{
                setLoading(false)
                setLogin(false)
            }
        })

       

       

        return() =>{
            onsub()
        }

    }, [])


    if(loading){
        return <div></div>
    }

    if(!login){
        return <Navigate to={"/login"}/>
    }

    return children;
} 

