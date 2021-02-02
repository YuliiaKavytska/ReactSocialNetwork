import React from 'react';
import s from './FormsControls.module.css';

const FormControl = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;

    return <div className={s.form_control}>
        <div className={s.form_control_wrapper + (hasError ? ' ' + s.error : ' ')}>
            {children}
            {hasError && <div className={s.errors}>
                <span className={s.error_type}>{error}</span>
                <span className={s.exclemation}>!</span>
            </div>}
        </div>
    </div>
}

export const Textarea = (props) => {
    const {input, ...restProps} = props;
    return <FormControl {...props} ><textarea  {...input} {...restProps} /></FormControl>
}
export const Input = (props) => {
    const {input , ...restProps} = props;
    return <FormControl {...props} ><input {...input} {...restProps} /></FormControl>
}