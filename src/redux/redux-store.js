import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import asideReducer from "./aside-reducer";
import searchReducer from "./search-reducer";
import authReducer from "./auth-reducer";

let reducersBatch = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    aside: asideReducer,
    searchPage: searchReducer,
    auth: authReducer,
})

let store = createStore(reducersBatch);

window.store = store;

export default store;