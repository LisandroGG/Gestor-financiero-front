import CrearCategoria from "../Categorias/CrearCategoria";
import CrearGasto from "../Gastos/CrearGasto";

const Nav = ({usuario, logout}) => {

    if(!usuario) {
        return(
            <>Cargando...</>
        )
    }

    return(
        <header className="bg-nav p-2">
            <nav>
                <ul className="flex justify-between text-white items-center">
                    <li>Hola {usuario.nombreUsuario}</li>
                    <div className="flex gap-4">
                        <CrearCategoria />
                        <CrearGasto />
                    </div>
                    <li>
                        <button onClick={logout} className="p-2 rounded-lg bg-sky-500 hover:bg-sky-700 font-bold">
                            Cerrar sesión
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Nav