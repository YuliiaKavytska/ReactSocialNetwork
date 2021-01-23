import React from 'react';
import s from './Login.module.css';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {isRequired} from "../utils/validation";
import {Redirect} from "react-router";

const Login = props => {
    const login = (formData) => {
        props.loginThunkCreator(formData.login, formData.password, formData.remember)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return <div className={s.login_form}>
        <h1 className={s.login_title}>Login</h1>
        <LoginReduxForm onSubmit={login} />
    </div>
}

const LoginForm = props => {
    return <form action="" className={s.form} onSubmit={props.handleSubmit}>
        <div className={s.input_field}>
            <Field className={s.input} type="text" placeholder={'Email'} component={Input} name={'login'} validate={[isRequired]}/>
        </div>
        <div className={s.input_field}>
            <Field className={s.input} type="password" placeholder={'Password'} component={Input} name={'password'} validate={isRequired}/>
        </div>
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