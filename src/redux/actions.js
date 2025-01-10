import axios from 'axios'
import { 
        REGISTER_USUARIO,
        LOGIN_USUARIO,
        LOGOUT_USUARIO,
        OBTENER_CATEGORIAS,
        CREAR_CATEGORIA,
        EDITAR_CATEGORIA,
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

            return dispatch({
                type: REGISTER_USUARIO,
                payload: data,
            });
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
            console.error('Error al validar sesión:', error.message);
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
            alert(error.message || "ERROR AL OBTENER CATEGORÍAS");
        }
    }
}

export const crearCategoria = (idUsuario, nuevaCategoria) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`${LOCAL}/categorias/crear`, {
                idUsuario,
                nombreCategoria: nuevaCategoria,
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
            console.error('Error al crear categoría:', error.message);
            alert(error.message || 'ERROR AL CREAR CATEGORÍA');
        }
    };
};

