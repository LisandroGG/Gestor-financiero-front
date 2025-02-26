import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { crearCategoria, obtenerCategorias } from "../../redux/actions";

const CrearCategoria = () => {
    const dispatch = useDispatch();
    const usuario = useSelector((state) => state.usuario);
    const [nombreCategoria, setNombreCategoria] = useState('');

    const handlerCrearCategoria = async() => {
        if(!usuario) {
            alert('Debes iniciar sesion para crear una categoria');
            return;
        }

        if(nombreCategoria.trim()){
            await dispatch(crearCategoria(usuario.idUsuario, nombreCategoria));
            setNombreCategoria('');
        }else{
            alert('El nombre de la categoria es obligatorio')
        }
    };

    return(
        <section>
            <header>
                <h2>Crear categoria</h2>
            </header>
            <article>
                <form onSubmit={(e) => { e.preventDefault(); handlerCrearCategoria(); }}>
                    <input
                        type="text"
                        value={nombreCategoria}
                        onChange={(e) => setNombreCategoria(e.target.value)}
                        placeholder="Nueva categoria"
                        />
                    <button type="submit">Crear categoria</button>
                </form>
            </article>
        </section>
    )
}

export default CrearCategoria