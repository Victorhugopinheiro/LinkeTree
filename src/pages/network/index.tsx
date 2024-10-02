import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { db } from "../../services/firebaseConnection";
import { setDoc, doc, getDoc  } from "firebase/firestore";


export function Network() {
const [facebook, setFacebook] = useState("")
const [instagram, setInstagram] = useState("")
const [youtube, setYoutube] = useState("")

useEffect(() => {
    const getLinks = doc(db, "url", "sociais")
    getDoc(getLinks)
    .then((snapshot) => {
        if(snapshot.data() !== undefined){
            setFacebook(snapshot.data()?.linkFacebook)
            setInstagram(snapshot.data()?.linkInstagram)
            setYoutube(snapshot.data()?.linkYoutube)
        }
       



    }).catch((e) => {
        console.log(e)
    })


}, [])

function getLinks(e:FormEvent) {
    e.preventDefault()

  

    setDoc(doc(db, "url", "sociais"), {
        linkFacebook: facebook,
        linkInstagram: instagram,
        linkYoutube: youtube
    }).then(() => {
        console.log("Cadastrado com sucesso")
    }).catch((e) => {
        console.log(e)
    })


}

    return(
        <div className="w-full flex flex-col items-center">
            <Header/>


            <h1 className="text-white text-2xl font-medium my-4">Minha redes sociais</h1>

            <form onSubmit={getLinks} className="flex flex-col w-full max-w-xl">
                <label className="text-white my-1">Link do facebook</label>
                <Input value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="Digite a url do facebook..."/>

                <label className="text-white my-1">Link do instragram</label>
                <Input value={instagram} onChange={(e) => setInstagram(e.target.value)}  placeholder="Digite a url do instagram..."/>

                <label className="text-white my-1">Link do youtube</label>
                <Input value={youtube} onChange={(e) => setYoutube(e.target.value)} placeholder="Digite a url do youtube..."/>

                <button  className="text-white bg-blue-600 h-8 rounded">Salvar links</button>

            </form>
        </div>

    )
}