import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import React, {useEffect} from "react";
import s from "./ProfileInfo.module.css";

const ProfileDataForm = ({initialValues, status, isOwner, onMainPhotoSelected, handleSubmit, error, ...props}) => {

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
        <div className={s.field}>
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
        <div className={s.field}>
            <b>My professional skills: </b>
            <Field component={Input}
                   placeholder={'Professional skills'}
                   name='lookingForAJobDescription'/>
        </div>
        <div>
            {Object.keys(initialValues.contacts).map((key) => (
                <Contact key={key} socialMedia={key} socialValue={initialValues.contacts[key]}/>
            ))}
        </div>
        <b>New photo: </b>
        {isOwner && <input
            type='file'
            accept=".jpg, .jpeg, .png"
            className={s.button}
            onChange={onMainPhotoSelected}/>}
        <p>
            <button
                className={s.button + ' ' + s.send_form}>
                Save
            </button>
        </p>
    </form>
}

const Contact = ({socialMedia, socialValue}) => {
    return <div className={s.field}>
        <b>{socialMedia}: </b>
        <Field component={Input} placeholder={socialMedia} name={'contacts.' + socialMedia} />
        {socialValue}
    </div>
}

const ProfileDataFormContainer = reduxForm({form: 'profileInfo'})(ProfileDataForm);

export default ProfileDataFormContainer;
