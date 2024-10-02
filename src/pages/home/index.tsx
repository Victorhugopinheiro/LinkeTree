import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"
import { Sociais } from "../../components/sociais"
import { Header } from "../../components/header"
import { db } from "../../services/firebaseConnection"
import { getDocs, getDoc, query, doc, collection, orderBy } from "firebase/firestore"
import { useEffect, useState } from "react"



export function Home() {
    const [links, setlinks] = useState<ListaProps[]>([])
    const [sociais, setSociais] = useState<Sociais>()

    interface ListaProps {
        id: string
        nomeLink:string
        urlLink:string
        bgInput:string
        corInput:string

    }

    interface Sociais{
        facebook: string
        instagram: string
        youtube: string
    }

    useEffect(() => {

        function getItems() {
            const colecao = collection(db, "link")
            const filtrando = query(colecao, orderBy("created", "asc"))

            getDocs(filtrando)
            .then((snapshot) => {
                let lista = [] as ListaProps[] 

                snapshot.forEach((item) => {
                    
                    lista.push({
                        id: item.id,
                        bgInput: item.data()?.bgInput,
                        corInput: item.data()?.corInput,
                        nomeLink: item.data()?.nomeLink,
                        urlLink: item.data()?.urlLink
                    })
                })

                setlinks(lista)

            }).catch((e) => {
                console.log(e)
            })

        }

        getItems()

    }, [])

    useEffect(() => {
        function getSociais (){
            const getLink = doc(db, "url", "sociais")

        getDoc(getLink)
        .then((onSnapshot) => {
            if(onSnapshot.data() !== undefined){
                setSociais({
                    facebook: onSnapshot.data()?.linkFacebook,
                    instagram: onSnapshot.data()?.linkInstagram,
                    youtube: onSnapshot.data()?.linkYoutube
                })
                
            }
            
            

        })
        }

        getSociais()

    }, [])

    return(
        <div className=" flex flex-col w-full justify-center items-center py-4 ">
            <Header/>

            <h1 className=" md:text-4xl text-3xl font-bold text-white mt-20">Victor</h1>

            <span className="text-gray-400 mb-5 mt-3">Veja meus links </span>


            <main className="flex flex-col w-11/12 max-w-xl text-center ">
                {links.map ((item) => (
                    <section key={item.id} className="my-2 py-2 rounded-lg select-none cursor-pointer transition-transform /hover:scale-105" style={{background: item.bgInput}}>
                    <a>
                        <p style={{color: item.corInput}} className="text-base md:text-lg">
                           {item.nomeLink}
                        </p>

                    </a>

                </section>
                ))}


                {sociais && Object.keys(sociais).length > 0 && (
                    <footer className="flex justify-center gap-3 my-4">

                    <Sociais url={sociais?.youtube}>
                        <FaYoutube size={35} color="#fff"/>

                    </Sociais>

                    <Sociais url={sociais?.facebook}>
                        <FaFacebook size={35} color="#fff"/>

                    </Sociais>

                    <Sociais url={sociais?.instagram}>
                        <FaInstagram size={35} color="#fff"/>

                    </Sociais>

                </footer>
                )
                    
                }
            </main>

            
        </div>

    )
}