import { FormEvent, useState, useEffect } from "react"
import { Header } from "../../components/header"
import { Input } from "../../components/input"
import { FiTrash } from "react-icons/fi"
import { db } from "../../services/firebaseConnection"
import { addDoc, collection, onSnapshot, orderBy, query, doc, deleteDoc } from "firebase/firestore"

export function Admin() {
    const [nomeLink, setNomeLink] = useState("")
    const [urlLink, setUrlLink] = useState("")
    const [corInput, setCorInput] = useState("")
    const [bgInput, setBgInput] = useState("")
    const[links, setLinks] = useState<ListaProps[]>([])

    interface ListaProps {
        id: string
        nomeLink:string
        urlLink:string
        bgInput:string
        corInput:string

    }


    useEffect(() => {

        const select = collection(db, "link");
        const filtrando = query(select, orderBy("created", "asc"))

        const unsub = onSnapshot(filtrando, (doc) => {

            let lista = [] as ListaProps[]

            

            doc.forEach((item) => {
                
                lista.push(
                    {
                        id: item.id,
                        nomeLink: item.data().nomeLink,
                        urlLink: item.data().urlLink,
                        bgInput: item.data().bgInput,
                        corInput: item.data().corInput

                    }
                )

            })

           
            
            setLinks(lista)
           
        })

        return () => {
            return unsub()
        }

    }, [])

    function gerarLink(e: FormEvent) {

        e.preventDefault()

        if (nomeLink === "" || urlLink === "") {
            alert("preecha todos os campos")
            return
        }

        addDoc(collection(db, "link"), {
            nomeLink: nomeLink,
            urlLink: urlLink,
            corInput: corInput,
            bgInput: bgInput,
            created: new Date()
        }).then(() => {
            {
                setNomeLink("")
                setUrlLink("")
                console.log("Dados cadastrados")
            }
        }).catch((e) => {
            console.log(e)
        })

    }
    function deleteItem (id:string) {

        const documento = doc(db, "link", id)

        deleteDoc(documento)

    }


    return (
        <div className="flex  flex-col items-center h-screen w-full pb-2 px-6 ">
            <Header />



            <form onSubmit={gerarLink} className="flex flex-col my-10 w-full max-w-xl">
                <div className=" flex flex-col ">
                    <label className="text-white font-medium my-1">Nome do link</label>
                    <Input value={nomeLink} onChange={(e) => setNomeLink(e.target.value)} placeholder="Digite o nome do link..." />
                </div>

                <div className=" flex flex-col ">
                    <label className="text-white font-medium my-1">Url do link</label>
                    <Input value={urlLink} onChange={(e) => setUrlLink(e.target.value)} placeholder="Digite a url do link..." />
                </div>


                <section className="flex gap-4 my-8">

                    <div className="flex gap-2">
                        <label className="text-white font-medium my-1">Cor do link</label>
                        <input value={corInput} onChange={(e) => setCorInput(e.target.value)} type="color" />
                    </div>

                    <div className="flex gap-2">
                        <label className="text-white font-medium my-1">Fundo do Link</label>
                        <input value={bgInput} onChange={(e) => setBgInput(e.target.value)} type="color" />
                    </div>


                </section>

                {nomeLink !== "" && (
                    <div className="flex flex-col  items-center mb-7 p-1 border-gray-100/25 border rounded-md">
                        <label className="text-white font-medium mb-3">Veja como está ficando: </label>

                        <article style={{ background: bgInput }} className=" flex justify-center w-11/12 py-2 font-medium bg-white mb-1 rounded-md h-5/6">

                            <p style={{ color: corInput }}>{nomeLink}</p>
                        </article>



                    </div>
                )}

                <button className="bg-blue-600 p-2 rounded-md font-medium text-white"> Cadastrar </button>

            </form>

            <h2 className="font-bold text-xl mb-3 text-white">Meus links</h2>

            {links.map((item) => (
                <article key={item.id} className="flex w-11/12 max-w-xl my-3 p-3 rounded items-center justify-between select-none " style={{
                    background: item.bgInput, color: item.corInput
                }}>
                <p className="text-white">{item.nomeLink}</p>

                <div>
                    <button onClick={() => deleteItem(item.id)} className="border border-dashed bg-slate-950 p-1"><FiTrash size={18} color="#fff" /></button>

                </div>

            </article>
            ))}

            


        </div>

    )
}