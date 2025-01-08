import { useDispatch, useSelector } from "react-redux"
import { logoutUsuario } from "../../redux/actions"
import { useNavigate } from "react-router-dom";

const Home = () => {

    const usuario = useSelector((state) => state.usuario);

    console.log('datos del state usuario:', usuario);

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUsuario())
        navigate('/login')
    }

    return(
        <div>
            <h1>Hola {usuario?.nombreUsuario}</h1>
            <button onClick={handleLogout} className="border-2 bg-rose-100">Cerrar sesion</button>
        </div>
    )
}

export default Home