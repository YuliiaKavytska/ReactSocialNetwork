import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import asideReducer from "./aside-reducer";
import searchReducer from "./search-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

let reducersBatch = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    aside: asideReducer,
    searchPage: searchReducer,
    auth: authReducer,
    form: formReducer
})

let store = createStore(reducersBatch, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;