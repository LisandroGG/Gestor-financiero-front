import { 
        REGISTER_USUARIO,
        LOGIN_USUARIO,
        LOGOUT_USUARIO,
        OBTENER_CATEGORIAS,
        CREAR_CATEGORIA,
        ACTUALIZAR_CATEGORIA,
        ELIMINAR_CATEGORIA,
        OBTENER_GASTOS,
        CREAR_GASTO,
        ACTUALIZAR_GASTO,
        ELIMINAR_GASTO
    } from './action-types'

export const initialState = {
    usuario: null,
    categorias: [],
    gastos: [],
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
            return {
                ...state,
                usuario: action.payload,
                
            };

        case LOGOUT_USUARIO:       
            return{
                ...state,
                usuario: null,
                categorias: [],
                gastos: []
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

        case ACTUALIZAR_CATEGORIA:
            return {
                ...state,
                categorias: state.categorias.map((categoria) =>
                    categoria.idCategoria === action.payload.idCategoria
                        ? { ...categoria, nombreCategoria: action.payload.nombreCategoria }
                        : categoria
                ),
            }

        case ELIMINAR_CATEGORIA:
            return {
                ...state,
                categorias: state.categorias.filter((categoria) => categoria.idCategoria !== action.payload.idCategoria),
            }
        
        case OBTENER_GASTOS:
            return {
                ...state,
                gastos: action.payload
            }

        case CREAR_GASTO:
            return {
                ...state,
                gastos: [...state.gastos, action.payload],
            };
            
        case ACTUALIZAR_GASTO:
            return {
                ...state,
                gastos: state.gastos.map((gasto) =>
                    gasto.idGasto === action.payload.idGasto
                        ? { ...gasto, cantidadGasto: action.payload.cantidadGasto, idCategoria: action.payload.idCategoria }
                        : gasto
                ),
            };
            
        case ELIMINAR_GASTO:
            return {
                ...state,
                gastos: state.gastos.filter((gasto) => gasto.idGasto !== action.payload),
            };

        default:
            console.log('Estado antes de retornar:', state);
            return state;
    }
}

export default rootReducer

