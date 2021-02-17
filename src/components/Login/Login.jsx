import React from 'react';
import s from './Login.module.css';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {isRequired} from "../utils/validation";
import {Redirect} from "react-router";

const Login = ({isAuth, userId, loginThunkCreator, captchaUrl}) => {
    const login = (formData) => {
        loginThunkCreator(formData.login, formData.password, formData.remember, formData.captcha)
    }

    if (isAuth && userId) {
        return <Redirect to={'/profile'} />
    }

    return <div className={s.login_form}>
        <h1 className={s.login_title}>Login</h1>
        <LoginReduxForm captchaUrl={captchaUrl} onSubmit={login} />
    </div>
}

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return <form action="" className={s.form} onSubmit={handleSubmit}>
        {error && <div>
            <p className={s.show_type_error}>{error}</p>
        </div>}
        <div className={s.input_field}>
            <Field className={s.input} type="text" placeholder={'Email'} component={Input} name={'login'} validate={[isRequired]}/>
        </div>
        <div className={s.input_field}>
            <Field className={s.input} type="password" placeholder={'Password'} component={Input} name={'password'} validate={[isRequired]}/>
        </div>
        {captchaUrl && <div className={s.captcha}>
            <p className={s.captcha_title}>Are you a human? Write down anti-bot symbols.</p>
            <div className={s.captcha_img}>
                <img src={captchaUrl} alt="captcha"/>
            </div>
            <div className={s.input_field}>
                <Field className={s.input} type='text' component={Input} name='captcha' placeholder='Validate symbols' validate={[isRequired]} />
            </div>
            </div>}
        <div className={s.input_submit}>
            <div>
                <Field className={s.input_check} type="checkbox" component={'input'} name={'remember'}/>
                Remember me
            </div>
            <button className={s.login_button} >Submit</button>
        </div>
    </form>;
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

export default Login;