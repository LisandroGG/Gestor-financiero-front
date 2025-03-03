import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { crearCategoria } from "../../redux/actions";
import Input from "../UI/Input";
import Swal from "sweetalert2";
import ErrorMessage from "../UI/ErrorMessage";

const CrearCategoria = () => {
    const dispatch = useDispatch();
    const usuario = useSelector((state) => state.usuario);
    const [nombreCategoria, setNombreCategoria] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const handlerCrearCategoria = async() => {

        if(!usuario) {
            Swal.fire({
                icon: "error",
                title: "Debes iniciar sesion antes de crear una categoria",
                showConfirmButton: false,
                timer: 1000
            })
            return;
        }

        setIsLoading(true)

        try {
            const response = await dispatch(crearCategoria(usuario.idUsuario, nombreCategoria))
            
            if(response.success){
                Swal.fire({
                    icon: "success",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1000,
                    willClose: () => {
                        setModalOpen(false),
                        setNombreCategoria('')
                    }
                })
            }else{
                setError(response.message);
            }
        } catch (error) {
            setError("Ocurrio un error inesperado")
        }finally {
            setIsLoading(false)
        }

    };

    const toggleModal = () => {
        setError("");
        setModalOpen(!modalOpen)
    };

    return(
        <section className="">
            <button onClick={toggleModal} className="bg-sky-500 text-white ring-sky-700 hover:ring-2 transition-all hover:bg-sky-700 font-bold p-2 rounded-lg w-40">Crear categoria</button>
            
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[30rem] relative">
                        <header className="mb-4">
                            <h2 className="text-2xl font-bold">Crear categoria</h2>
                        </header>
                        <article>
                            <form 
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handlerCrearCategoria();
                                }}
                            >
                                <Input
                                    type="text"
                                    value={nombreCategoria}
                                    onChange={(e) => setNombreCategoria(e.target.value)}
                                    placeholder="Nueva categoria"
                                    className="mb-4"
                                />
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
                                        className="bg-sky-500 ring-sky-700 hover:ring-2 hover:bg-sky-700 transition-all text-white font-bold px-4 py-2 rounded"
                                    >
                                        {isLoading ? 'Creando...' : 'Crear categoria'}
                                    </button>
                                </div>
                            </form>
                        </article>
                    </div>
                </div>
            )}
        </section>
    )
}

export default CrearCategoria