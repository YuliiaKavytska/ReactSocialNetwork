import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import asideReducer from "./aside-reducer";

let reducersBatch = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    aside: asideReducer
})

let store = createStore(reducersBatch);

export default store;