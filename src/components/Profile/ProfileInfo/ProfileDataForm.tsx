import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import React, {ChangeEvent} from "react";
import s from "./ProfileInfo.module.css";
import {ProfileType} from "../../../types/types";

interface IProps {
    initialValues: ProfileType
    profile: ProfileType
    isOwner: boolean
    onMainPhotoSelected: (e: ChangeEvent<HTMLInputElement>) => void
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, IProps> & IProps> = ({
                                                                                        profile,
                                                                                        isOwner,
                                                                                        onMainPhotoSelected,
                                                                                        handleSubmit,
                                                                                        error
                                                                                    }) => {

    return <form className={s.information} onSubmit={handleSubmit}>
        {error && <p className={s.show_type_error}>{error}</p>}
        <div className={s.field}>
            <b>Name: </b>
            <Field placeholder='Full name' name='fullName' component={Input}/>
        </div>
        <div className={s.field}>
            <b>About me: </b>
            <Field placeholder={'About me'} name='aboutMe' component={Input}/>
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
            {Object.keys(profile.contacts).map((key) => (
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
        <p>
            <button className={s.button + ' ' + s.send_form}>Save</button>
        </p>
    </form>
}

interface IPropsContacts {
    socialMedia: string
}

const Contact: React.FC<IPropsContacts> = ({socialMedia}) => {
    return <div className={s.field}>
        <b>{socialMedia}: </b>
        <Field component={Input} placeholder={socialMedia} name={'contacts.' + socialMedia}/>
    </div>
}

const ProfileDataFormContainer = reduxForm<ProfileType, IProps>({form: 'profileInfo'})(ProfileDataForm);

export default ProfileDataFormContainer;
