import CrearCategoria from "../Categorias/CrearCategoria";
import CrearGasto from "../Gastos/CrearGasto";

const Nav = ({usuario, logout}) => {

    if(!usuario) {
        return(
            <>Cargando...</>
        )
    }

    return(
        <header className="bg-nav p-4 rounded-b-2xl">
            <nav>
                <ul className="flex justify-between text-white items-center md:mx-32 lg:mx-52">
                    <li>Hola <span className="text-sky-500 font-bold">{usuario.nombreUsuario}</span></li>
                    <li><img src="assets/logo.svg" alt='logo' width="45px" /></li>
                    <li>
                        <button onClick={logout} className="p-2 rounded-lg bg-sky-500 ring-sky-700 hover:ring-2 hover:bg-sky-700 font-bold transition-all">
                            Cerrar sesión
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Nav