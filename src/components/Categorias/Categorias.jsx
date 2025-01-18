import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actualizarCategoria, eliminarCategoria, obtenerGastos } from '../../redux/actions';

const Categorias = ({ categorias }) => {
    const [categoriaEditada, setCategoriaEditada] = useState('');
    const [idCategoriaEditada, setIdCategoriaEditada] = useState(null);
    const dispatch = useDispatch();

    const usuario = useSelector((state) => state.usuario);
    const [errorMessage, setErrorMessage] = useState("");

    const handleEditar = (idCategoria, nombreCategoria) => {
        setIdCategoriaEditada(idCategoria);
        setCategoriaEditada(nombreCategoria);
    };

    const handleGuardar = async () => {
        if (categoriaEditada.trim() !== '') {
            try {
                await dispatch(actualizarCategoria(usuario.idUsuario, idCategoriaEditada, categoriaEditada));

                await dispatch(obtenerGastos(usuario.idUsuario));

                setCategoriaEditada('');
                setIdCategoriaEditada(null);
            } catch (error) {
                console.error('Error al editar la categoría o actualizar los gastos:', error);
            }
        } else {
            alert('El nombre de la categoría no puede estar vacío.');
        }
    };

    const handleEliminar = async(idCategoria) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
            try {
                const response = await dispatch(eliminarCategoria(usuario.idUsuario, idCategoria));

                if(response?.message){
                    setErrorMessage(response.message)
                    return
                }

                await dispatch(obtenerGastos(usuario.idUsuario));
                setErrorMessage("");
            } catch (error) {
                console.log('Error al eliminar la categoria', error)
                setErrorMessage('Hubo un problema al eliminar la categoria')
            }
        }
    };

    return (
        <div>
            {errorMessage}
            {categorias.length ? (
                <ul>
                    {categorias.map((categoria) => (
                        <li key={categoria.idCategoria}>
                            {idCategoriaEditada === categoria.idCategoria ? (
                                <input
                                    type="text"
                                    value={categoriaEditada}
                                    onChange={(e) => setCategoriaEditada(e.target.value)}
                                />
                            ) : (
                                categoria.nombreCategoria
                            )}

                            {idCategoriaEditada !== categoria.idCategoria && (
                                <button onClick={() => handleEditar(categoria.idCategoria, categoria.nombreCategoria)}>
                                    Editar
                                </button>
                            )}

                            {idCategoriaEditada === categoria.idCategoria && (
                                <button onClick={handleGuardar}>Guardar</button>
                            )}

                            {idCategoriaEditada !== categoria.idCategoria && (
                                <button onClick={() => handleEliminar(categoria.idCategoria)}>Eliminar</button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay categorías disponibles.</p>
            )}
        </div>
    );
};

export default Categorias;