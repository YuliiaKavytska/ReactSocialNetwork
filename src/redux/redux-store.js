import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import asideReducer from "./aside-reducer";
import searchReducer from "./search-reducer";

let reducersBatch = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    aside: asideReducer,
    searchPage: searchReducer,
})

let store = createStore(reducersBatch);

window.store = store;

export default store;