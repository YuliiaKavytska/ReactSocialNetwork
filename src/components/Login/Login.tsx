import React from 'react'
import s from './Login.module.css'
import {InjectedFormProps, reduxForm} from "redux-form"
import {CreateField, Input} from "../common/FormsControls/FormsControls"
import {isRequired} from "../utils/validation"
import {Redirect} from "react-router"
import {useDispatch, useSelector} from "react-redux";
import {loginThunkCreator} from "../../redux/auth-reducer";
import {StateType} from "../../redux/redux-store";

interface IPayloadData {
    login: string
    password: string
    remember: boolean
    captcha: string
}

// исключаем другие типы данных из неймов для полей. они могут быть только стринг
export type FieldNameTypes = Extract<keyof IPayloadData, string>

const Login: React.FC = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector((state: StateType) => state.auth.isAuth)
    const userId = useSelector((state: StateType) => state.auth.id)
    const captchaUrl = useSelector((state: StateType) => state.auth.captchaUrl)

    const login = (formData: IPayloadData) => {
        dispatch(loginThunkCreator(formData.login, formData.password, formData.remember, formData.captcha))
    }

    if (isAuth && userId) {
        return <Redirect to={'/profile'}/>
    }

    return <div className={s.login_form}>
        <h1 className={s.login_title}>Login</h1>
        <LoginReduxForm captchaUrl={captchaUrl} onSubmit={login}/>
    </div>
}

interface IForm {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<IPayloadData, IForm> & IForm> = ({handleSubmit, error, captchaUrl}) => {
    return <form action="" className={s.form} onSubmit={handleSubmit}>
        {error && <div>
            <p className={s.show_type_error}>{error}</p>
        </div>}
        {CreateField<FieldNameTypes>("text", 'Email', Input, 'login', [isRequired])}
        {CreateField<FieldNameTypes>("password", 'Password', Input, 'password', [isRequired])}
        {captchaUrl && <div className={s.captcha}>
            <p className={s.captcha_title}>Are you a human? Write down anti-bot symbols.</p>
            <div className={s.captcha_img}>
                <img src={captchaUrl} alt="captcha"/>
            </div>
            {CreateField<FieldNameTypes>("text", 'Validate symbols', Input, 'captcha', [isRequired])}

        </div>}
        <div className={s.input_submit}>
            {CreateField<FieldNameTypes>("checkbox",
                undefined,
                'input',
                'remember',
                undefined,
                'Remember me')}
            <button className={s.login_button}>Submit</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm<IPayloadData, IForm>({form: 'login'})(LoginForm)

export default Login