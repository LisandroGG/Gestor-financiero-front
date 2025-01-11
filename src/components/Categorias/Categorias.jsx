import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actualizarCategoria, eliminarCategoria } from '../../redux/actions';

const Categorias = ({ categorias }) => {
    const [categoriaEditada, setCategoriaEditada] = useState('');
    const [idCategoriaEditada, setIdCategoriaEditada] = useState(null);
    const dispatch = useDispatch();

    const usuario = useSelector((state) => state.usuario);
    const handleEditar = (idCategoria, nombreCategoria) => {
        setIdCategoriaEditada(idCategoria);
        setCategoriaEditada(nombreCategoria);
    };

    const handleGuardar = () => {
        if (categoriaEditada.trim() !== '') {
            dispatch(actualizarCategoria(usuario.idUsuario, idCategoriaEditada, categoriaEditada));
            setCategoriaEditada('');
            setIdCategoriaEditada(null);
        } else {
            alert('El nombre de la categoría no puede estar vacío.');
        }
    };

    const handleEliminar = (idCategoria) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
            dispatch(eliminarCategoria(usuario.idUsuario, idCategoria));
        }
    };

    return (
        <div>
            
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