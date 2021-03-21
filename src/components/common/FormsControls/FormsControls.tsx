import React from 'react'
import s from './FormsControls.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form"
import {ValidateType} from "../../utils/validation";

interface IFormControlProps {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<IFormControlProps> = ({meta: {touched, error}, children}) => {
    // если мы тронули и не прошла валидация, тоесть есть ошибка. в ошибке хранится ошибка валидации
    const hasError = touched && error

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
export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    // достаем данные. инпут нужен для самого инпута, там храниться нейм, велью и специальные методы.
    // рест это то, что мы передадим сами. например плейсхолдер. но все проспы нужны всей обертке
    // таким образом мы исключили мету и инпуту не даем мету.
    const {input, meta, ...restProps} = props
    return <FormControl {...props} ><textarea {...input} {...restProps} /></FormControl>
}
export const Input: React.FC<WrappedFieldProps> = (props: any) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props} ><input {...input} {...restProps} /></FormControl>
}
// уточняем чем могут быть неймы у инпута чтобы не опечататься. они могут быть только стринг
// иначе будет ошибка в филде
export function CreateField<FieldNameTypes extends string>(type: string,
                            placeholder: string | undefined,
                            component: React.FC<WrappedFieldProps> | string,
                            name: FieldNameTypes,
                            validate: Array<ValidateType> | undefined,
                            text?: string | undefined,
                            divClass: string = 'input_field',
                            fieldClass: string = 'input',
) {
    return <div className={s[divClass]}>
        <Field className={s[fieldClass]} type={type} placeholder={placeholder} component={component} name={name}
               validate={validate}/> {text}
    </div>
}