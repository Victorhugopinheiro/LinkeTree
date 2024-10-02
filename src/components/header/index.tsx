import { BiLogOut } from "react-icons/bi"
import { Link } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../../services/firebaseConnection"



export function Header() {
    function logout() {
        signOut(auth)

    }


    return(
        <header className=" flex w-full max-w-2xl h-12 my-4 ">
            <nav className="bg-white w-full rounded-md flex justify-between items-center px-4 ">
                <div className=" flex gap-2 font-medium">
                    <Link to={"/"}>Home</Link>
                    <Link to={"/admin"}>Admin</Link>
                    <Link to={"/admin/sociais"}>Redes sociais</Link>      
                </div>
                <button onClick={logout} ><BiLogOut size={30} color="#db2629"/></button>

            </nav>

        </header>
    )
}