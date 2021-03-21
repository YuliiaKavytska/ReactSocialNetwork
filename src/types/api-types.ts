export enum ResponseResultCodes {
    Success = 0,
    SomeError = 1,
}

export enum ResponseWithCaptcha { CaptchaError = 10 }

export interface RespT<D = {}, RC = ResponseResultCodes> {
    data: D
    resultCode: RC
    messages: Array<string>
}