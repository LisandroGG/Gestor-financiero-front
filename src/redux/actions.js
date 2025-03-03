import axios from 'axios'
import { 
        REGISTER_USUARIO,
        LOGIN_USUARIO,
        LOGOUT_USUARIO,
        CHANGE_PASSWORD,
        FORGOT_PASSWORD,
        VALIDATION_MAIL,
        OBTENER_CATEGORIAS,
        CREAR_CATEGORIA,
        ACTUALIZAR_CATEGORIA,
        ELIMINAR_CATEGORIA,
        OBTENER_GASTOS,
        CREAR_GASTO,
        ACTUALIZAR_GASTO,
        ELIMINAR_GASTO
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

            return { success: true, message: data.message };
            
        } catch (error) {
            const errorMessage = error.response?.data.message || error.message;
            return { success: false, message: errorMessage };
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

            if (!data.token) {
                throw new Error('El token no está presente en la respuesta.');
            }

            dispatch({
                type: LOGIN_USUARIO,
                payload: {
                    idUsuario: data.token.idUsuario,
                    nombreUsuario: data.token.nombreUsuario,
                },
            });

            return { success: true, message: data.message };

        } catch (error) {
            const errorMessage = error.response?.data.message || error.message;
            return { success: false, message: errorMessage };
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

            return dispatch({
                type: LOGIN_USUARIO,
                payload: {
                    idUsuario: data.idUsuario,
                    nombreUsuario: data.nombreUsuario,
                    gmailUsuario: data.gmailUsuario,
                },
            });
        } catch (error) {
            console.error('Usuario desautorizado', error.message);
        }
    };
};

export const forgotPassword = (gmailUsuario) => {
    return async(dispatch) => {
        try {
            const { data } = await axios.post(`${LOCAL}/usuarios/forgotPassword`, {
                gmailUsuario
            });

            dispatch({
                type: FORGOT_PASSWORD,
                payload: data
            })

            return { success: true, message: data.message };
        } catch (error) {
            const errorMessage = error.response?.data.message || error.message;
            return { success: false, message: errorMessage };
        }
    }
}

export const changePassword = (token, nuevaContraseña) => {
    return async(dispatch) => {
        try {
            const { data } = await axios.put(`${LOCAL}/usuarios/changePassword?token=${token}`, {
                nuevaContraseña
            });

            dispatch({
                type: CHANGE_PASSWORD,
                payload: data
            })

            return { success: true, message: data.message };

        } catch (error) {
            const errorMessage = error.response?.data.message || error.message;
            return { success: false, message: errorMessage };
        }
    }
}

export const sendVerification = (gmailUsuario) => {
    return async(dispatch) => {
        try {
            const { data } = await axios.post(`${LOCAL}/usuarios/reverificar`, {
                gmailUsuario
            })

            dispatch({
                type: VALIDATION_MAIL,
                payload: data
            })

            return { success: true, message: data.message };

        } catch (error) {
            const errorMessage = error.response?.data.message || error.message;
            return { success: false, message: errorMessage };
        }
    }
}

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
            console.error("Error al obtener categorías");
        }
    }
}

export const crearCategoria = (idUsuario, nuevaCategoria) => {
    const nombreCategoriaNormalizado = nuevaCategoria.trim().toLowerCase();

    return async (dispatch) => {
        try {
            const { data } = await axios.post(`${LOCAL}/categorias/crear`, {
                idUsuario,
                nombreCategoria: nombreCategoriaNormalizado,
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            dispatch({
                type: CREAR_CATEGORIA,
                payload: data,
            });

            return { success: true, message: 'Categoria creada!' };
        } catch (error) {
            const errorMessage = error.response?.data.message || error.message;
            return { success: false, message: errorMessage };
        }
    };
};

export const actualizarCategoria = (idUsuario, idCategoriaEditada, categoriaEditada) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.put(`${LOCAL}/categorias/actualizar/${idUsuario}/${idCategoriaEditada}`, {
                nombreCategoria: categoriaEditada.trim(),
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            dispatch({
                type: ACTUALIZAR_CATEGORIA,
                payload: {
                    idCategoria: data.categoria.idCategoria,
                    nombreCategoria: data.categoria.nombreCategoria
                },
            });
            return { success: true, message: data.message };
        } catch (error) {
            const errorMessage = error.response?.data.message || error.message;
            return { success: false, message: errorMessage };
        }
    };
};

export const eliminarCategoria = (idUsuario, idCategoria) => {

    return async (dispatch) => {
        try {
            const { data } = await axios.delete(`${LOCAL}/categorias/eliminar/${idUsuario}/${idCategoria}`, {
                withCredentials: true,
            });

            dispatch({
                type: ELIMINAR_CATEGORIA,
                payload: { idCategoria }
            })

            return { success: true, message: data.message };
        } catch (error) {
            const errorMessage = error.response?.data.message || error.message;
            return { success: false, message: errorMessage };
        }
    }
}

export const obtenerGastos = (idUsuario) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${LOCAL}/gastos/obtener/${idUsuario}`, {
                withCredentials: true,
            });

            return dispatch({
                type: OBTENER_GASTOS,
                payload: data
            })
        } catch (error) {
            console.log('Error al obtener gastos')
        }
    }
}

export const crearGasto = (gasto) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${LOCAL}/gastos/crear`, gasto);
        dispatch({
            type: CREAR_GASTO,
            payload: data.gasto,
        });

        return { success: true, message: data.message };
    } catch (error) {
        const errorMessage = error.response?.data.message || error.message;
        return { success: false, message: errorMessage };
    }
};

export const actualizarGasto = ({ idUsuario, idCategoria, idGasto, cantidadGasto }) => async (dispatch) => {
    try {
        const { data } = await axios.put(
            `${LOCAL}/gastos/actualizar/${idUsuario}/idCategoria/${idCategoria}/idGasto/${idGasto}`,
            { cantidadGasto }
        );
        dispatch({
            type: ACTUALIZAR_GASTO,
            payload: {
                idGasto: data.gasto.idGasto,
                idUsuario: data.gasto.idUsuario,
                idCategoria: data.gasto.idCategoria,
                cantidadGasto: data.gasto.cantidadGasto
            },
        });

        return { success: true, message: data.message };
    } catch (error) {
        const errorMessage = error.response?.data.message || error.message;
        return { success: false, message: errorMessage };
    }
};

export const eliminarGasto = (idUsuario, idGasto) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`${LOCAL}/gastos/eliminar/${idUsuario}/${idGasto}`);
        dispatch({
            type: ELIMINAR_GASTO,
            payload: idGasto,
        });

        return { success: true, message: data.message };
    } catch (error) {
        const errorMessage = error.response?.data.message || error.message;
        return { success: false, message: errorMessage };
    }
};

