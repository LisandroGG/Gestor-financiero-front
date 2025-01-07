import axios from 'axios'
import { REGISTER_USUARIO, LOGIN_USUARIO } from './action-types'

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