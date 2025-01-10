import axios from 'axios'
import { 
        REGISTER_USUARIO,
        LOGIN_USUARIO,
        LOGOUT_USUARIO,
        OBTENER_CATEGORIAS,
        CREAR_CATEGORIA,
        ACTUALIZAR_CATEGORIA,
        ELIMINAR_CATEGORIA 
    } from './action-types'

const LOCAL = import.meta.env.VITE_LOCAL;

//USUARIOS

export const registerUsuario = (userData) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`${LOCAL}/usuarios/register`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(data)

            dispatch({
                type: REGISTER_USUARIO,
                payload: data,
            });

            return { success: true}
            
        } catch (error) {
            alert(error.response?.data.message || error.message);
        }
    };
};

export const loginUsuario = (loginData) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`${LOCAL}/usuarios/login`, loginData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            console.log('Respuesta completa del backend:', data);

            if (!data.token) {
                throw new Error('El token no está presente en la respuesta.');
            }

            console.log('NOMBRE USUARIO', data.token.nombreUsuario);
            console.log('ID USUARIO', data.token.idUsuario);

            return dispatch({
                type: LOGIN_USUARIO,
                payload: {
                    idUsuario: data.token.idUsuario,
                    nombreUsuario: data.token.nombreUsuario,
                },
            });
        } catch (error) {
            alert(error.response?.data.message || error.message);
        }
    };
};

export const logoutUsuario = () => {
    return async(dispatch) => {
        try {
            await axios.post(`${LOCAL}/usuarios/logout`, {}, {
                withCredentials: true,
            })

            console.log('sesion cerrada')

            return dispatch({
                type: LOGOUT_USUARIO
            })
        } catch (error) {
            alert(error.message || 'ERROR AL CERRAR SESION');
        }
    }
}

export const validarSesion = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${LOCAL}/usuarios/validarSesion`, {
                withCredentials: true,
            });

            console.log('Sesión validada:', data);

            return dispatch({
                type: LOGIN_USUARIO,
                payload: {
                    idUsuario: data.idUsuario,
                    nombreUsuario: data.nombreUsuario,
                },
            });
        } catch (error) {
            console.error('Usuario desautorizado', error.message);
        }
    };
};

//CATEGORIAS

export const obtenerCategorias = (idUsuario) => {
    return async(dispatch) => {
        try {
            const { data } = await axios.get(`${LOCAL}/categorias/obtener/${idUsuario}`, {
                withCredentials: true,
            });

            return dispatch({
                type: OBTENER_CATEGORIAS,
                payload: data
            })
        } catch (error) {
            console.error("Error al obtener categorías:", error.message);
        }
    }
}

export const crearCategoria = (idUsuario, nuevaCategoria) => {
    const nombreCategoriaNormalizado = nuevaCategoria.trim().toLowerCase();

    return async (dispatch) => {
        try {
            const { data } = await axios.post(`${LOCAL}/categorias/crear`, {
                idUsuario,
                nombreCategoria: nombreCategoriaNormalizado, // Asegúrate de que el nombre esté normalizado
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            console.log('Categoría creada:', data);

            return dispatch({
                type: CREAR_CATEGORIA,
                payload: data,
            });
        } catch (error) {
            console.error('Error al crear categoría:', error.response?.data?.message || error.message);
            alert(error.response?.data?.message || 'ERROR AL CREAR CATEGORÍA');
        }
    };
};

export const actualizarCategoria = (idUsuario, idCategoriaEditada, categoriaEditada) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.put(`${LOCAL}/categorias/actualizar/${idUsuario}/${idCategoriaEditada}`, {
                nombreCategoria: categoriaEditada.trim(), // Asegúrate de que el nombre esté limpio
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            return dispatch({
                type: ACTUALIZAR_CATEGORIA,
                payload: {
                    idCategoria: data.categoria.idCategoria,
                    nombreCategoria: data.categoria.nombreCategoria
                },
            });
        } catch (error) {
            console.log('Error al actualizar categoria', error.response?.data?.message || error.message);
            alert(error.response?.data?.message || 'ERROR AL ACTUALIZAR CATEGORIA');
        }
    };
};

export const eliminarCategoria = (idUsuario, idCategoria) => {

    return async (dispatch) => {
        try {
            const { data } = await axios.delete(`${LOCAL}/categorias/eliminar/${idUsuario}/${idCategoria}`, {
                withCredentials: true,
            });

            return dispatch({
                type: ELIMINAR_CATEGORIA,
                payload: { idCategoria }
            })
        } catch (error) {
            console.log('Error al eliminar categoria', error.message);
            alert(error.message || 'ERROR AL ELIMINAR CATEGORIA')
        }
    }
}

