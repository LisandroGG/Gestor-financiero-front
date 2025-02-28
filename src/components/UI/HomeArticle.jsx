
const HomeArticle = ({text1, text2, data}) => {
    return(
        <article className="flex flex-col text-center rounded-lg border-2 border-gray-400 w-full md:w-72 lg:w-72  p-2"> 
            <h1>{text1}</h1>
            <h1>{text2}</h1>
            <h1>{data ? data : "Cargando..."}</h1>
        </article>
    )
}

export default HomeArticle