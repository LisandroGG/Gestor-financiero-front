import { REGISTER_USUARIO, LOGIN_USUARIO, LOGOUT_USUARIO } from "./action-types";

export const initialState = {
    usuario: null,
}

function rootReducer(state = initialState, action) {
    console.log('Acción recibida:', action);
    switch(action.type) {
        case REGISTER_USUARIO:
            return{
                ...state,
            }

        case LOGIN_USUARIO:

        console.log('Datos a guardar en el state usuario:', action.payload);

            return {
                ...state,
                usuario: action.payload,
                
            };

        case LOGOUT_USUARIO:
                
            return{
                ...state,
                usuario: null,
            }

        default:
            console.log('Estado antes de retornar:', state);
            return state;
    }
}

export default rootReducer

