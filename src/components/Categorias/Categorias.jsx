import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actualizarCategoria, eliminarCategoria, obtenerGastos } from '../../redux/actions';
import Input from '../UI/Input';
import ErrorMessage from '../UI/ErrorMessage';
import IconEdit from '../UI/Icons/IconEdit';
import IconDelete from '../UI/Icons/IconDelete';
import Swal from 'sweetalert2';

const Categorias = ({ categorias }) => {
    const [categoriaEditada, setCategoriaEditada] = useState('');
    const [idCategoriaEditada, setIdCategoriaEditada] = useState(null);
    const [modalOpen, setModalOpen] = useState(false)
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch();
    const usuario = useSelector((state) => state.usuario);

    const handleEditar = (idCategoria, nombreCategoria) => {
        setIdCategoriaEditada(idCategoria);
        setCategoriaEditada(nombreCategoria);
        setModalOpen(true)
    };

    const handleGuardar = async () => {
        
        setIsLoading(true)
            try {
                const response = await dispatch(actualizarCategoria(usuario.idUsuario, idCategoriaEditada, categoriaEditada));

                if(response.success){
                    Swal.fire({
                        icon: "success",
                        title: response.message,
                        showConfirmButton: false,
                        timer: 1000,
                        willClose: () => {
                            setModalOpen(false)
                            dispatch(obtenerGastos(usuario.idUsuario));
                            setCategoriaEditada('');
                            setIdCategoriaEditada(null);
                            setError('')
                        }
                    })
                }else{
                    setError(response.message)
                }
            }catch(error){
                setError("Ocurrio un error inesperado")
            }finally{
                setIsLoading(false)
            }
    };

    const handleEliminar = async(idCategoria) => {

        Swal.fire({
            title: "¿Seguro quieres eliminar esta categoria?",
            showDenyButton: true,
            confirmButtonText: "Si",
            denyButtonText: `No`,
            confirmButtonColor: '#0ea5e9',
            denyButtonColor: '#ef4444'
        }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                    const response = await dispatch(eliminarCategoria(usuario.idUsuario, idCategoria));
    
                    if(response.success) {
                        Swal.fire({
                            icon: "success",
                            title: response.message,
                            showConfirmButton: false,
                            timer: 1000,
                        })
                    }else {
                        Swal.fire({
                            icon: "error",
                            title: response.message,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
    
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Ocurrio un error inesperado",
                        showConfirmButton: false,
                        timer: 1500
                    })                  
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
            {categorias.length ? (
                <div className="">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2 text-left font-bold">Categoria</th>
                                <th className="border p-2 text-center font-bold">Editar</th>
                                <th className="border p-2 text-center font-bold">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias.map((categoria) => (
                                <tr key={categoria.idCategoria}>
                                    <td className="border p-2 font-semibold max-w-32 break-words whitespace-normal">{categoria.nombreCategoria}</td>
                                    <td className="border p-2 text-center hover:bg-gray-100">
                                        <button
                                            onClick={() => handleEditar(categoria.idCategoria, categoria.nombreCategoria)}
                                        >
                                            <IconEdit className= "text-sky-500 hover:text-sky-700 cursor-pointer"/>
                                        </button>
                                    </td>
                                    <td className="border p-2 text-center hover:bg-gray-100">
                                        <button
                                            onClick={() => handleEliminar(categoria.idCategoria)}
                                        >
                                            <IconDelete classname='text-red-500 hover:text-red-700 cursor-pointer'/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className='font-semibold text-center w-full h-full flex justify-center items-center'>0 categorias disponibles</p>
            )}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[30rem]">
                        <header className="mb-4">
                            <h2 className="text-2xl font-bold">Editar categoría</h2>
                        </header>
                        <Input
                            type="text"
                            value={categoriaEditada}
                            onChange={(e) => setCategoriaEditada(e.target.value)}
                            className="mb-4"
                            placeholder="Nuevo nombre de la categoría"
                        />
                        <ErrorMessage message={error} />
                        <div className="flex justify-end gap-2 mt-2">
                            <button
                                onClick={toggleModal}
                                className="bg-gray-300 ring-gray-400 hover:ring-2 hover:bg-gray-400 transition-all px-4 py-2 rounded font-bold"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleGuardar}
                                className="bg-sky-500 ring-sky-700 hover:ring-2 hover:bg-sky-700 transition-all text-white font-bold px-4 py-2 rounded"
                            >
                                {isLoading ? "Actualizando..." : "Guardar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Categorias;