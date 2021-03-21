import {instance} from "./api"
import {RespT} from "../types/api-types"
import {ResponseResultCodes, ResponseWithCaptcha} from "../types/api-types"

export type AuthMeData = { id: number, email: string, login: string }
type LoginData = { userId: number }

export const AuthAPI = {
    authMe() {
        return instance.get<RespT<AuthMeData>>(`/auth/me`).then(res => res.data)
    },
    login(email: string, password: string, remember = false, captcha: string | null = null) {
        return instance.post<RespT<LoginData, ResponseResultCodes | ResponseWithCaptcha>>
        (`/auth/login`, {email, password, rememberMe: remember, captcha})
            .then(res => res.data)
    },
    logout() {
        return instance.delete<RespT>(`/auth/login`).then(res => res.data)
    }
}