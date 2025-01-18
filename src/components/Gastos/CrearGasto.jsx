import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crearGasto, obtenerGastos } from "../../redux/actions";

const CrearGasto = () => {
    const dispatch = useDispatch();
    const categorias = useSelector((state) => state.categorias);
    const usuario = useSelector((state) => state.usuario);

    const [montoGasto, setMontoGasto] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

    const handleCrearGasto = async (e) => {
        e.preventDefault();

        if (!montoGasto.trim() || !categoriaSeleccionada) {
            alert("Debes completar todos los campos.");
            return;
        }

        try {
            await dispatch(
                crearGasto({
                    idUsuario: usuario.idUsuario,
                    idCategoria: categoriaSeleccionada,
                    cantidadGasto: montoGasto,
                })
            );

            await dispatch(obtenerGastos(usuario.idUsuario));

            setMontoGasto("");
            setCategoriaSeleccionada("");
        } catch (error) {
            console.error("Error al crear o obtener los gastos:", error);
        }
    };

    return (
        <div>
            <h2>Crear Gasto</h2>
            <form onSubmit={handleCrearGasto}>
                <input
                    type="number"
                    placeholder="Monto del gasto"
                    value={montoGasto}
                    onChange={(e) => setMontoGasto(e.target.value)}
                />
                <select
                    value={categoriaSeleccionada}
                    onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.idCategoria} value={categoria.idCategoria}>
                            {categoria.nombreCategoria}
                        </option>
                    ))}
                </select>
                <button type="submit">Crear gasto</button>
            </form>
        </div>
    );
};

export default CrearGasto;