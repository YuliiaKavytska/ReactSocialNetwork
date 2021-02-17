import {AuthAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: true,
    captchaUrl: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            };
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.url
            }
        default:
            return state;
    }
}

export const setUser = (id, email, login, isAuth) => ({type: SET_USER_DATA, data: {id, email, login, isAuth}});
export const setCaptchaUrl = (url) => ({type: SET_CAPTCHA_URL, url})

export default authReducer;

export const setUserThunkCreator = () => async (dispatch) => {
    let data = await AuthAPI.authMe();
    if (data.resultCode === 0) {
        let {id, email, login} = data.data;
        dispatch(setUser(id, email, login, true));
    }
    return data;
};

export const loginThunkCreator = (email, password, remember, captcha) => async (dispatch) => {
    let response = await AuthAPI.login(email, password, remember, captcha);

    if (response.resultCode === 0) {
        dispatch(setUserThunkCreator());
    } else {
        if (response.resultCode === 10) dispatch(getCaptchaTC());
        // если у нас плохой результат, то есть ошибки. если длинна массива ошибок больше 0 то берем эту ошибку, если ее нет то левая ошибка
        let message = response.messages.length > 0 ? response.messages[0] : 'Some error';
        // при неудачном входе останавливаем самбмит фомы (указываем),
        // ворой параметр это объект ошибок. если она общая, то _error, если специфическое поле, то указываем это поле так как в сторе
        // стопсабмит это екшинкриейтор.
        // если мы передадим емейл и ошибку то он подсветится будто не прошла валидация.
        // если ошибка общая, то она будет храниться не в мете для инпута, а просто в пропсах
        dispatch(stopSubmit('login', {_error: message}));
    }
}

export const logoutThunkCreator = () => async (dispatch) => {
    let response = await AuthAPI.logout();

    if (response.resultCode === 0) {
        dispatch(setUser(null, null, null, false));
    }
}

export const getCaptchaTC = () => async (dispatch) => {
    const data = await securityAPI.getCaptcha();
    dispatch(setCaptchaUrl(data.url));
}