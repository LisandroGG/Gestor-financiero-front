import { REGISTER_USUARIO, LOGIN_USUARIO } from "./action-types";

export const initialState = {

}

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case REGISTER_USUARIO:
            return{
                ...state,
            }

        default:
            return{
                ...state,
            }
    }
}

export default rootReducer

