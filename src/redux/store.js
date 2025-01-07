import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';  // Correcto, sin llaves
import rootReducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);