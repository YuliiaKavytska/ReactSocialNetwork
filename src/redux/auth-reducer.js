import {AuthAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

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

export const setUserThunkCreator = () => (dispatch) => {
    AuthAPI.authMe().then(data => {
        if (data.resultCode === 0) {
            let {id, email, login} = data.data;
            dispatch(setUser(id, email, login, true));
        }
    })
};

export const loginThunkCreator = (email, password, remember) => (dispatch) => {
    AuthAPI.login(email, password, remember).then(response =>{
        if (response.resultCode === 0) {
            dispatch(setUserThunkCreator());
        }
    })
}

export const logoutThunkCreator = () => (dispatch) => {
    AuthAPI.logout().then(response =>{
        if (response.resultCode === 0) {
            dispatch(setUser(null, null, null, false));
        }
    })
}