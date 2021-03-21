import {instance} from "./api";

type Captcha  = { url: string }

export const securityAPI = {
    getCaptcha() {
        return instance.get<Captcha>('/security/get-captcha-url').then(response => response.data)
    }
}