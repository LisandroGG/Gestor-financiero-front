import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { crearCategoria } from "../../redux/actions";

const CrearCategoria = () => {
    const dispatch = useDispatch();
    const usuario = useSelector((state) => state.usuario);
    const [nombreCategoria, setNombreCategoria] = useState('');

    const handlerCrearCategoria = () => {
        if(!usuario) {
            alert('Debes iniciar sesion para crear una categoria');
            return;
        }

        if(nombreCategoria.trim()){
            dispatch(crearCategoria(usuario.idUsuario, nombreCategoria));
            setNombreCategoria('');
        }else{
            alert('El nombre de la categoria es obligatorio')
        }
    };

    return(
        <div>
            <h2>Crear categoria</h2>
            <input
                type="text"
                value={nombreCategoria}
                onChange={(e) => setNombreCategoria(e.target.value)}
                placeholder="Nueva categoria"
            />
            <button onClick={handlerCrearCategoria}>Crear categoria</button>
        </div>
    )
}

export default CrearCategoria