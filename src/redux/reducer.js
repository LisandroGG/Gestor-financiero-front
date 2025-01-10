import { 
        REGISTER_USUARIO,
        LOGIN_USUARIO,
        LOGOUT_USUARIO,
        OBTENER_CATEGORIAS,
        CREAR_CATEGORIA,
        EDITAR_CATEGORIA,
        ELIMINAR_CATEGORIA
    } from './action-types'

export const initialState = {
    usuario: null,
    categorias: [],
}

function rootReducer(state = initialState, action) {
    console.log('Acción recibida:', action);
    switch(action.type) {
        //USUARIO
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
                categorias: [],
            }

        //CATEGORIAS

        case OBTENER_CATEGORIAS:

        return{
            ...state,
            categorias: action.payload
        }

        case CREAR_CATEGORIA:

        return{
            ...state,
            categorias: [...state.categorias, action.payload]
        }

        default:
            console.log('Estado antes de retornar:', state);
            return state;
    }
}

export default rootReducer

