export function Error () {
    return(
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <h1 className="text-6xl text-white font-bold mb-3 ">404</h1>
            <h1 className="text-4xl text-white font-bold mb-3 ">Página não encontrada</h1>
            <p className="text-white mb-3">Você caiu em uma página que não existe</p>
            <p className="text-white bg-slate-600 rounded-md p-2">voltar para a home</p>
        </div>
    )
}