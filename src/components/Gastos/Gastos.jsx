import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actualizarGasto, eliminarGasto } from "../../redux/actions";

const Gastos = ({ gastos }) => {
    const dispatch = useDispatch();
    const usuario = useSelector((state) => state.usuario);
    const categorias = useSelector((state) => state.categorias);

    const [gastoEditado, setGastoEditado] = useState(null);
    const [montoGasto, setMontoGasto] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

    const handleEditarGasto = (gasto) => {
        setGastoEditado(gasto);
        setMontoGasto(gasto.cantidadGasto);
        setCategoriaSeleccionada(gasto.idCategoria);
    };

    const handleGuardarGasto = (e) => {
        e.preventDefault();

        if (!montoGasto || !categoriaSeleccionada) {
            alert("Debes completar todos los campos.");
            return;
        }

        dispatch(
            actualizarGasto({
                idGasto: gastoEditado.idGasto,
                idUsuario: usuario.idUsuario,
                idCategoria: categoriaSeleccionada,
                cantidadGasto: montoGasto,
            })
        );

        setGastoEditado(null);
        setMontoGasto("");
        setCategoriaSeleccionada("");
    };

    const handleEliminarGasto = (idGasto) => {
        if (window.confirm("¿Estás seguro de eliminar este gasto?")) {
            dispatch(eliminarGasto(usuario.idUsuario, idGasto));
        }
    };

    return (
        <div>
            <h1>Gastos</h1>

            {gastos.length ? (
                <ul>
                    {gastos.map((gasto) => (
                        <li key={gasto.idGasto}>
                            {gastoEditado?.idGasto === gasto.idGasto ? (
                                <>
                                    <input
                                        type="text"
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
                                    <button onClick={handleGuardarGasto}>Guardar</button>
                                </>
                            ) : (
                                <>
                                    <span>{gasto.cantidadGasto} - {gasto.categoria?.nombreCategoria}</span>
                                    <button onClick={() => handleEditarGasto(gasto)}>Editar</button>
                                    <button onClick={() => handleEliminarGasto(gasto.idGasto)}>Eliminar</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay gastos registrados.</p>
            )}
        </div>
    );}

export default Gastos;