import axios from 'axios'
import { REGISTER_USUARIO, LOGIN_USUARIO, LOGOUT_USUARIO } from './action-types'

const LOCAL = import.meta.env.VITE_LOCAL;


export const registerUsuario = (userData) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`${LOCAL}/usuarios/register`, userData, {
                headers: {
                    'Content-Type': 'application/json', // Especificamos que estamos enviando JSON
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

            console.log('Mensaje del backend',data)
            console.log('NOMBRE USUARIO', data.token.nombreUsuario)
            console.log('ID USUARIO', data.token.idUsuario)

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