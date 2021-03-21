import {FormAction, stopSubmit} from "redux-form"
import {BaseThunkType, InferActionsTypes} from "./redux-store"
import {AuthAPI, AuthMeData} from "../api/auth-api"
import {securityAPI} from "../api/security-api"
import {ResponseResultCodes, ResponseWithCaptcha, RespT} from "../types/api-types"

const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    isFetching: true,
    captchaUrl: null as string | null
}

const authReducer = (state = initialState, action: AuthActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/AUTH/SET_USER_DATA':
            return {
                ...state,
                ...action.data
            }
        case "SN/AUTH/SET_CAPTCHA_URL":
            return {
                ...state,
                captchaUrl: action.url
            }
        default:
            return state
    }
}
export default authReducer

export const actions = {
    setUser: (id: number | null, email: string | null, login: string | null,
               isAuth: boolean) => ({type: 'SN/AUTH/SET_USER_DATA', data: {id, email, login, isAuth}} as const),
    setCaptchaUrl: (url: string) => ({type: 'SN/AUTH/SET_CAPTCHA_URL', url} as const)
}

export const setUserThunkCreator = (): BaseThunkType<AuthActionTypes, Promise<RespT<AuthMeData>>> => async (dispatch) => {
    let data = await AuthAPI.authMe()
    if (data.resultCode === ResponseResultCodes.Success) {
        let {id, email, login} = data.data
        dispatch(actions.setUser(id, email, login, true))
    }
    return data
}

export const loginThunkCreator = (email: string, password: string, remember: boolean, captcha: string): ThunkType =>
    async (dispatch) => {
    let response = await AuthAPI.login(email, password, remember, captcha)

    if (response.resultCode === ResponseResultCodes.Success) {
        dispatch(setUserThunkCreator())
    } else {
        if (response.resultCode === ResponseWithCaptcha.CaptchaError) dispatch(getCaptchaTC())
        // если у нас плохой результат, то есть ошибки. если длинна массива ошибок больше 0 то берем эту ошибку, если ее нет то левая ошибка
        let message = response.messages.length > 0 ? response.messages[0] : 'Some error'
        // при неудачном входе останавливаем самбмит фомы (указываем),
        // ворой параметр это объект ошибок. если она общая, то _error, если специфическое поле, то указываем это поле так как в сторе
        // стопсабмит это екшинкриейтор.
        // если мы передадим емейл и ошибку то он подсветится будто не прошла валидация.
        // если ошибка общая, то она будет храниться не в мете для инпута, а просто в пропсах
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logoutThunkCreator = (): ThunkType => async (dispatch) => {
    let response = await AuthAPI.logout()

    if (response.resultCode === ResponseResultCodes.Success) {
        dispatch(actions.setUser(null, null, null, false))
    }
}

export const getCaptchaTC = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptcha()
    dispatch(actions.setCaptchaUrl(data.url))
}

export type AuthActionTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<AuthActionTypes | FormAction>
export type InitialStateType = typeof initialState