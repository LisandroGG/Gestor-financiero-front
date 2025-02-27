import { useDispatch, useSelector } from "react-redux";
import { logoutUsuario } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerCategorias } from "../../redux/actions";
import { obtenerGastos } from "../../redux/actions";

import Categorias from "../Categorias/Categorias";
import Gastos from "../Gastos/Gastos";
import ExportCsv from "../Csv/ExportCsv";
import GastosGraficos from "../GastosGrafico/GastosGrafico";
import Nav from "../Nav/Nav";

const Home = () => {
    const usuario = useSelector((state) => state.usuario);
    const categorias = useSelector((state) => state.categorias);
    const gastos = useSelector((state) => state.gastos);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [fechaHoraActual, setFechaHoraActual] = useState("");

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

    useEffect(() => {
        const intervalo = setInterval(() => {
            const ahora = new Date();
            const fechaHoraFormateada = ahora.toLocaleString("es-AR", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });
            setFechaHoraActual(fechaHoraFormateada);
        }, 1000);
    
        return () => clearInterval(intervalo);
    }, []);

    const handleLogout = () => {
        dispatch(logoutUsuario());
        navigate('/login');
    };

    if (loading) {
        return <div>Cargando categorías...</div>;
    }

    return (
        <main className="bg-fondoBody h-screen">
            <Nav usuario={usuario} logout={handleLogout}/>
            <h1>Fecha y Hora: {fechaHoraActual}</h1>
            <h1>Estas son tus categorías</h1>
            <Categorias categorias={categorias} />
            <Gastos gastos={gastos}/>
            <ExportCsv usuario={usuario} gastos={gastos} />
            <GastosGraficos gastos={gastos} />
        </main>
    );
};

export default Home;