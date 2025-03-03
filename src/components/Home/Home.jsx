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
import CrearCategoria from "../Categorias/CrearCategoria";
import CrearGasto from "../Gastos/CrearGasto";

import HomeArticle from "../UI/HomeArticle";

const Home = () => {
    const usuario = useSelector((state) => state.usuario);
    const categorias = useSelector((state) => state.categorias);
    const gastos = useSelector((state) => state.gastos);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [fechaHoraActual, setFechaHoraActual] = useState("");
    const [gastoTotal, setGastoTotal] = useState("");
    const [cantidadGastos, setCantidadGastos] = useState("")

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
            const totalGastado = gastos.reduce((acc, gasto) => acc + gasto.cantidadGasto, 0);
            const cantidadGastos = new Set(gastos.map(gasto => gasto.idGasto)).size;
            const fechaHoraFormateada = ahora.toLocaleString("es-AR", {
                weekday: "short",
                day: "2-digit",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });
            setFechaHoraActual(fechaHoraFormateada);
            setGastoTotal(totalGastado.toString());
            setCantidadGastos(cantidadGastos.toString());
        }, 1000);
    
        return () => clearInterval(intervalo);
    }, [gastos]);

    const handleLogout = () => {
        dispatch(logoutUsuario());
        navigate('/login');
    };

    if (loading) {
        return <div>Cargando categorías...</div>;
    }

    return (
        <div className="scrollbar-custom">
            <Nav usuario={usuario} logout={handleLogout}/>
            
            <main className="">
                <section className="bg-fondo mt-4 md:mt-8 lg:mt-10 mx-10 md:mx-32 lg:mx-44 p-6 rounded-xl justify-evenly flex flex-col md:flex-row lg:flex-row gap-4">
                    <HomeArticle text1="Fecha y Hora" data={fechaHoraActual} />
                    <HomeArticle text1="Total gastado:" data={gastoTotal}/>
                    <HomeArticle text1="Cantidad de gastos" data={cantidadGastos}/>
                </section>

                <section className="bg-fondo mt-4 md:mt-8 lg:mt-10 mx-10 md:mx-32 lg:mx-44 p-6 rounded-xl flex flex-col md:flex-row lg:flex-row justify-between">
                    <article className="bg-fondoBody p-4 rounded-xl flex flex-col gap-4 items-center">
                        <Categorias categorias={categorias} />
                        <CrearCategoria />
                    </article>
                    <article>
                        <GastosGraficos gastos={gastos} />
                    </article>
                    <article>
                        <Gastos gastos={gastos}/>
                        <CrearGasto />
                    </article>
                </section>
                <ExportCsv usuario={usuario} gastos={gastos} />
            </main>
        </div>
    );
};

export default Home;