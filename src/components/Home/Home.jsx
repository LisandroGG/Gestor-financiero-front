import { useDispatch, useSelector } from "react-redux";
import { logoutUsuario } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerCategorias } from "../../redux/actions";
import { obtenerGastos } from "../../redux/actions";

import Categorias from "../Categorias/Categorias";
import CrearCategoria from "../Categorias/CrearCategoria";
import Gastos from "../Gastos/Gastos";
import CrearGasto from "../Gastos/CrearGasto";

const Home = () => {
    const usuario = useSelector((state) => state.usuario);
    const categorias = useSelector((state) => state.categorias);
    const gastos = useSelector((state) => state.gastos);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (usuario?.idUsuario) {
            const fetchCategorias = dispatch(obtenerCategorias(usuario.idUsuario));
            const fetchGastos = dispatch(obtenerGastos(usuario.idUsuario));
    
            Promise.all([fetchCategorias, fetchGastos])
                .then(() => {
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error al cargar datos:', error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [usuario, dispatch]);

    const handleLogout = () => {
        dispatch(logoutUsuario());
        navigate('/login');
    };

    if (loading) {
        return <div>Cargando categorías...</div>;
    }

    return (
        <div>
            <h1>Hola {usuario?.nombreUsuario}</h1>
            <h1>Estas son tus categorías</h1>
            <Categorias categorias={categorias} />
            <CrearCategoria />
            <Gastos gastos={gastos}/>
            <CrearGasto />
            <button onClick={handleLogout} className="border-2 bg-rose-100">
                Cerrar sesión
            </button>
        </div>
    );
};

export default Home;