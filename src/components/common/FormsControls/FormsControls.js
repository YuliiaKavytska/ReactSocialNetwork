import React from 'react';
import s from './FormsControls.module.css';

const FormControl = ({input , meta, element, ...props}) => {
    const hasError = meta.touched && meta.error;

    return <div className={s.form_control }>
        <div className={s.form_control_wrapper + (hasError ? ' ' + s.error : ' ')}>
            {props.children}
            {hasError && <div className={s.errors}>
                <span className={s.error_type}>{meta.error}</span>
                <span className={s.exclemation}>!</span>
            </div>}
        </div>
    </div>
}

export const Textarea = (props) => {
    const {input , meta, element, ...restProps} = props;
    return <FormControl {...props} ><textarea  {...input} {...restProps} /></FormControl>
}
export const Input = (props) => {
    const {input , meta, element, ...restProps} = props;
    return <FormControl {...props} ><input {...input} {...restProps} /></FormControl>
}
