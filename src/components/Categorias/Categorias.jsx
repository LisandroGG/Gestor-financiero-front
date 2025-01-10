
const Categorias = ({ categorias }) => {

    return (
        <div>
            {categorias.length ? (
                <ul>
                    {categorias.map((categoria) => (
                        <li key={categoria.idCategoria}>{categoria.nombreCategoria}</li>
                    ))}
                </ul>
            ) : (
                <p>No hay categorías disponibles.</p>
            )}
        </div>
    )
}

export default Categorias