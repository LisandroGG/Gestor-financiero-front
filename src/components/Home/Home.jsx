import { useDispatch, useSelector } from "react-redux";
import { logoutUsuario } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerCategorias } from "../../redux/actions";

import Categorias from "../Categorias/Categorias";
import CrearCategoria from "../Categorias/CrearCategoria";

const Home = () => {
    const usuario = useSelector((state) => state.usuario);
    const categorias = useSelector((state) => state.categorias);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (usuario?.idUsuario) {
            const fetchCategorias = async () => {
                try {
                    await dispatch(obtenerCategorias(usuario.idUsuario));
                } catch (error) {
                    console.error('Error al obtener categorías:', error);
                } finally {
                    setLoading(false); // Finalizar carga cuando las categorías estén listadas o haya un error
                }
            };
            
            fetchCategorias();
        } else {
            setLoading(false); // Si no hay usuario, finalizamos la carga
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
            <button onClick={handleLogout} className="border-2 bg-rose-100">
                Cerrar sesión
            </button>
        </div>
    );
};

export default Home;