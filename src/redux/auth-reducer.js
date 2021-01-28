import {AuthAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: true,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
}

export const setUser = (id, email, login, isAuth) => ({type: SET_USER_DATA, data: {id, email, login, isAuth}});

export default authReducer;

export const setUserThunkCreator = () => async (dispatch) => {
    let data = await AuthAPI.authMe();
    if (data.resultCode === 0) {
        let {id, email, login} = data.data;
        dispatch(setUser(id, email, login, true));
    }
};

export const loginThunkCreator = (email, password, remember) => async (dispatch) => {
    let response = await AuthAPI.login(email, password, remember);

    if (response.resultCode === 0) {
        dispatch(setUserThunkCreator());
    } else {
        let message = response.data.message > 0 ? response.message : 'Some error';
        dispatch(stopSubmit('login', {_error: message}));
    }
}

export const logoutThunkCreator = () => async (dispatch) => {
    let response = await AuthAPI.logout();

    if (response.resultCode === 0) {
        dispatch(setUser(null, null, null, false));
    }
}