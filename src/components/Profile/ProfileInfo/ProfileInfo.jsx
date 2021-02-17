import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import ProfileData from "./ProfileData";
import ProfileDataFormContainer from "./ProfileDataForm";

const ProfileInfo = ({profile, status, isOwner, setNewStatusThunkCreator, savePhoto, setProfileTC}) => {
    const [editMode, setEditMode] = useState(false);

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length)
            savePhoto(e.target.files[0])
    }

    const onSubmit = (formData) => {
        let promise = setProfileTC(formData);
        promise.then(() => {
            setEditMode(i => !i)
        });
    }

    return <div className={s.mainInformation}>
        <div className={s.mainInfoBlock}>
            <div>
                <img src={profile.photos.large
                    ? profile.photos.large
                    : "https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png"} alt="ava"/>
                {isOwner && !editMode && <button
                    className={s.button + ' ' + s.editing_btn}
                    onClick={() => setEditMode(i => !i)}>
                    Edit mode
                </button>}
            </div>
            {editMode
                ? <ProfileDataFormContainer initialValues={profile}
                                            status={status}
                                            isOwner={isOwner}
                                            onSubmit={onSubmit}
                                            onMainPhotoSelected={onMainPhotoSelected}
                />
                : <ProfileData profile={profile}
                               status={status}
                               isOwner={isOwner}
                               onMainPhotoSelected={onMainPhotoSelected}
                               setNewStatusThunkCreator={setNewStatusThunkCreator}/>
            }
        </div>
    </div>
}

export default ProfileInfo;