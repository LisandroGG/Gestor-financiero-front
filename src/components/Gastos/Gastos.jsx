import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actualizarGasto, eliminarGasto, obtenerGastos } from "../../redux/actions";
import Input from "../UI/Input";
import ErrorMessage from "../UI/ErrorMessage";
import IconEdit from "../UI/Icons/IconEdit";
import IconDelete from "../UI/Icons/IconDelete";
import Swal from "sweetalert2";

const Gastos = ({ gastos }) => {
    const dispatch = useDispatch();
    const usuario = useSelector((state) => state.usuario);
    const categorias = useSelector((state) => state.categorias);

    const [gastoEditado, setGastoEditado] = useState(null);
    const [montoGasto, setMontoGasto] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [modalOpen, setModalOpen] = useState(false)
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const handleEditarGasto = (gasto) => {
        setGastoEditado(gasto);
        setMontoGasto(gasto.cantidadGasto);
        setCategoriaSeleccionada(gasto.idCategoria);
        setModalOpen(true)
    };

    const handleGuardarGasto = async() => {
        setIsLoading(true)

        try {
            const response = await dispatch(
                actualizarGasto({
                    idGasto: gastoEditado.idGasto,
                    idUsuario: usuario.idUsuario,
                    idCategoria: categoriaSeleccionada,
                    cantidadGasto: montoGasto,
                })
            );
            if (response.success) {
                Swal.fire({
                    icon: "success",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1000,
                    willClose: () => {
                        setModalOpen(false);
                        dispatch(obtenerGastos(usuario.idUsuario));
                        setGastoEditado(null);
                        setMontoGasto("");
                        setCategoriaSeleccionada("");
                        setError("");
                    },
                })
            }else{
                setError(response.message);
            }
        } catch (error) {
            setError("Ocurrió un error inesperado.");
        } finally {
            setIsLoading(false)
        }
    };

    const handleEliminarGasto = async (idGasto) => {
        Swal.fire({
            title: "¿Seguro quieres eliminar este gasto?",
            showDenyButton: true,
            confirmButtonText: "Sí",
            denyButtonText: `No`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await dispatch(eliminarGasto(usuario.idUsuario, idGasto));

                    if (response.success) {
                        Swal.fire({
                            icon: "success",
                            title: response.message,
                            showConfirmButton: false,
                            timer: 1000,
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: response.message,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Ocurrió un error inesperado",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        });
    };

    const toggleModal = () => {
        setError("");
        setModalOpen(!modalOpen)
    };

    return (
        <section className="w-full max-h-56 lg:min-h-44 overflow-auto">
            {gastos.length ? (
                <div className="">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                            <th className="border p-2 text-left font-bold">Categoria</th>
                            <th className="border p-2 text-left font-bold">Cantidad</th>
                            <th className="border p-2 text-left font-bold">Fecha</th>
                            <th className="border p-2 text-left font-bold">Editar</th>
                            <th className="border p-2 text-left font-bold">Borrar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gastos.map((gasto) => (
                                <tr key={gasto.idGasto}>
                                    <td className="border p-2 font-semibold max-w-32 break-words whitespace-normal">{gasto.categoria?.nombreCategoria}</td>
                                    <td className="border p-2 font-semibold break-words whitespace-normal">{gasto.cantidadGasto}</td>
                                    <td className="">{new Date(gasto.createdAt).toLocaleDateString('es-ES')}</td>
                                    <td className="border p-2 text-center hover:bg-gray-100">
                                        <button 
                                            onClick={() => handleEditarGasto(gasto)}>
                                            <IconEdit className= "text-sky-500 hover:text-sky-700 cursor-pointer" />
                                        </button>
                                    </td>
                                    <td className="border p-2 text-center hover:bg-gray-100">
                                        <button
                                            onClick={() => handleEliminarGasto(gasto.idGasto)}>
                                            <IconDelete classname='text-red-500 hover:text-red-700 cursor-pointer'/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className='font-semibold text-center w-full h-full flex justify-center items-center'>0 gastos disponibles</p>
            )}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[30rem]">
                        <header className="mb-4">
                            <h2 className="text-2xl font-bold">Editar gasto</h2>
                        </header>
                        <Input
                            type="number"
                            value={montoGasto}
                            onChange={(e) => setMontoGasto(e.target.value)}
                            className="mb-4"
                            placeholder="Cantidad del gasto"
                        />
                        <select
                            value={categoriaSeleccionada}
                            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                            className="mb-4 p-2 border rounded w-full"
                        >
                            <option value="">Selecciona una categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.idCategoria} value={categoria.idCategoria}>
                                    {categoria.nombreCategoria}
                                </option>
                            ))}
                        </select>
                        <ErrorMessage message={error} />
                        <div className="flex justify-end gap-2 mt-2">
                            <button
                                onClick={toggleModal}
                                className="bg-gray-300 ring-gray-400 hover:ring-2 hover:bg-gray-400 transition-all px-4 py-2 rounded font-bold"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleGuardarGasto}
                                className="bg-sky-500 ring-sky-700 hover:ring-2 hover:bg-sky-700 transition-all text-white font-bold px-4 py-2 rounded"
                            >
                                {isLoading ? "Guardando..." : "Guardar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );}

export default Gastos;