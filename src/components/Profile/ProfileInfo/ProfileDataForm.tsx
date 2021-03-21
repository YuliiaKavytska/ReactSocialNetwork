import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import React, {ChangeEvent} from "react";
import s from "./ProfileInfo.module.css";
import {ContactsType, ProfileMainInfoType, ProfileType, ReqDataType} from "../../../types/types";

interface IProps {
    values: ProfileType
    status: string | null
    isOwner: boolean
    onMainPhotoSelected: (e: ChangeEvent<HTMLInputElement>) => void
}

const ProfileDataForm: React.FC<InjectedFormProps<ReqDataType, IProps> & IProps> = ({initialValues,
                                               status,
                                               isOwner,
                                               onMainPhotoSelected,
                                               handleSubmit,
                                               error, values}) => {

    return <form className={s.information} action="" onSubmit={handleSubmit} >
        {error && <p className={s.show_type_error}>{error}</p>}
        <div className={s.field}>
            <b>Name: </b>
            <Field  placeholder='Full name' name='fullName' component={Input} />
        </div>
        <div className={s.field}>
            <b>About me: </b>
            <Field  placeholder={'About me'} name='aboutMe' component={Input}/>
        </div>
        <div className={s.field + ' ' + s.looking_job}>
            <div>
                <b>Looking for a job: </b>
                <Field name='lookingForAJob'
                       component={Input}
                       type='radio'
                       value={true}/>
                Yes
                <Field name='lookingForAJob'
                       component={Input}
                       type='radio'
                       value={false}/>
                No
            </div>
        </div>
        <div className={s.field}>
            <b>My professional skills: </b>
            <Field component={Input}
                   placeholder={'Professional skills'}
                   name='lookingForAJobDescription'/>
        </div>
        <div>
            {Object.keys(values.contacts).map((key) => (
                <Contact key={key} socialMedia={key}
                         // socialValue={initialValues.contacts[key]}
                />
            ))}
        </div>
        <b>New photo: </b>
        {isOwner && <input
            type='file'
            accept=".jpg, .jpeg, .png"
            className={s.button}
            onChange={onMainPhotoSelected}/>}
        <p><button className={s.button + ' ' + s.send_form}>Save</button></p>
    </form>
}
interface IPropsContacts { socialMedia: string}
const Contact: React.FC<IPropsContacts> = ({socialMedia}) => {
    return <div className={s.field}>
        <b>{socialMedia}: </b>
        <Field component={Input} placeholder={socialMedia} name={'contacts.' + socialMedia} />
    </div>
}

const ProfileDataFormContainer = reduxForm<ReqDataType, IProps>({form: 'profileInfo'})(ProfileDataForm);

export default ProfileDataFormContainer;
