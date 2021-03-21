import React from 'react'
import {connect} from "react-redux"
import {loginThunkCreator} from "../../redux/auth-reducer"
import Login from "./Login"
import {StateType} from "../../redux/redux-store";

const mapStateToProps = (state: StateType): IStateProps => ({
    isAuth: state.auth.isAuth,
    userId: state.auth.id,
    captchaUrl: state.auth.captchaUrl
})

interface  IStateProps {
    isAuth: boolean
    userId: number | null
    captchaUrl: string | null
}

const dispatchToProps = {
    loginThunkCreator
}
interface IDispatch {
    loginThunkCreator: (email: string, password: string, remember: boolean, captcha: string) => void
}

export type LoginPropsType = IStateProps & IDispatch
export default connect(mapStateToProps, dispatchToProps)(Login)