import { Link } from "react-router-dom"
import { Input } from "../../components/input"
import { FormEvent, useState } from "react"
import { auth } from "../../services/firebaseConnection"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"


export function Login() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const navigate = useNavigate()

    function getForm (e: FormEvent) {
        e.preventDefault()

        if(email === "" || senha=== ""){
            alert("Preecha todos o campos")
        }


        signInWithEmailAndPassword(auth, email, senha)
        .then(() => {
            
            console.log("Logado com sucesso")
            navigate("/admin", {replace: true})

            
        }).catch((error) => {
            console.log(`Erro::::::::::::::: ${error}`)
        })
    }

    return(
        <div className="flex w-full h-screen flex-col justify-center items-center">
            <h1>Página login</h1>


            <Link to={"/"}>
                <h1 className="mt-11 mb-8 font-bold text-5xl text-white">Dev 
                    
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">link</span>

                
                </h1>
            </Link>

            <form className="flex flex-col w-full max-w-md" onSubmit={getForm}>
                <Input placeholder="Digite o e-mail" value={email} type="email" onChange={(e) => setEmail(e.target.value)}>

                </Input>

                <Input placeholder="Digite A senha" value={senha} type="password" onChange={(e) => setSenha(e.target.value)}>

                </Input>
                
                <button className="text-white bg-slate-800 h-9 rounded-md mt-1 font-bold hover:bg-slate-700">Acessar</button>

            </form>
        </div>

    )
}