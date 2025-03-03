import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crearGasto, obtenerGastos } from "../../redux/actions";
import Input from "../UI/Input";
import Swal from "sweetalert2";
import ErrorMessage from "../UI/ErrorMessage";

const CrearGasto = () => {
    const dispatch = useDispatch();
    const categorias = useSelector((state) => state.categorias);
    const usuario = useSelector((state) => state.usuario);

    const [montoGasto, setMontoGasto] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const handleCrearGasto = async (e) => {

        if (!categoriaSeleccionada) {
            setError("Debes seleccionar una categoria");
            return;
        }

        setIsLoading(true)

        try {
            const response = await dispatch(
                crearGasto({
                    idUsuario: usuario.idUsuario,
                    idCategoria: categoriaSeleccionada,
                    cantidadGasto: montoGasto,
                })
            );

            await dispatch(obtenerGastos(usuario.idUsuario));

            if(response.success){
                Swal.fire({
                    icon: "success",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1000,
                    willClose: () => {
                        setModalOpen(false)
                        setMontoGasto('')
                        setCategoriaSeleccionada('')
                    }
                })
            }else{
                setError(response.message)
            }
        } catch (error) {
            setError("Ocurrio un error inesperado");
        }finally{
            setIsLoading(false)
        }
    };

    const toggleModal = () => {
        setError("");
        setModalOpen(!modalOpen)
    };

    return (
        <section>
            <button onClick={toggleModal} className="text-white bg-sky-500 ring-sky-700 hover:ring-2 transition-all hover:bg-sky-700 font-bold p-2 rounded-lg w-40">Crear gasto</button>

            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-black">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[30rem] relative">
                        <header className="mb-4">
                            <h2 className="text-2xl font-bold">Crear gasto</h2>
                        </header>
                        <article>
                            <form  
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleCrearGasto()
                                }}
                            >
                                <Input 
                                    type="number"
                                    value={montoGasto}
                                    onChange={(e) => setMontoGasto(e.target.value)}
                                    placeholder="Monto del gasto"
                                    className="mb-4"
                                />
                                <select
                                    className="mb-4 text-lg font-semibold border-gray-200 border-2 rounded-md p-2 focus:border-sky-500 focus:outline focus:outline-sky-500 w-full"
                                    value={categoriaSeleccionada}
                                    onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
                                        <option value="">Selecciona una categoria</option>
                                        {categorias.map((categoria) => (
                                            <option key={categoria.idCategoria} value={categoria.idCategoria}>
                                                {categoria.nombreCategoria}
                                            </option>
                                        ))}
                                </select>
                                <ErrorMessage message={error} />
                                <div className="flex justify-end gap-2 mt-2">
                                    <button 
                                        type="button" 
                                        onClick={toggleModal}
                                        className="bg-gray-300 ring-gray-400 hover:ring-2 hover:bg-gray-400 transition-all px-4 py-2 rounded font-bold"
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="bg-sky-500 hover:bg-sky-700 ring-sky-700 hover:ring-2 transition-all text-white font-bold px-4 py-2 rounded"
                                    >
                                        {isLoading ? 'Creando...' : 'Crear gasto'}
                                    </button>
                                </div>
                            </form>
                        </article>
                    </div>
                </div>
            )}
        </section>
    );
};

export default CrearGasto;