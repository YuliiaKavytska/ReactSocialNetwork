import React from 'react';
import s from './FormsControls.module.css';

const FormControl = ({meta: {touched, error}, children}) => {
    // если мы тронули и не прошла валидация, тоесть есть ошибка. в ошибке хранится ошибка валидации
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

// это мы убираем дублирование.
export const Textarea = (props) => {
    // достаем данные. инпут нужен для самого инпута, там храниться нейм, велью и специальные методы.
    // рест это то, что мы передадим сами. например плейсхолдер. но все проспы нужны всей обертке
    // таким образом мы исключили мету и инпуту не даем мету.
    const {input, ...restProps} = props;
    return <FormControl {...props} ><textarea  {...input} {...restProps} /></FormControl>
}
export const Input = (props) => {
    const {input , ...restProps} = props;
    return <FormControl {...props} ><input {...input} {...restProps} /></FormControl>
}