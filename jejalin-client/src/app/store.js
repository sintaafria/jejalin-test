import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import authReducer from "./features/auth/reducer";
import productReducer from "./features/product/reducer";

const composerEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const rootReducers = combineReducers({
    auth: authReducer,
    product: productReducer
});
const store  = createStore(rootReducers, composerEnhancer(applyMiddleware(thunk)));

export default store