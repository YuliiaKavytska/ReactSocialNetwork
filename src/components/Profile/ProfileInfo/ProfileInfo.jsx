import React from 'react';
import s from './ProfileInfo.module.css';
import HookUserStatus from "./HookUserStatus";

const ProfileInfo = ({profile, status, setNewStatusThunkCreator}) => {
    return <div className={s.mainInformation}>
            <div className={s.mainInfoBlock}>
                <img src={profile.photos.large
                    ? profile.photos.large
                    : "https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png"} alt="ava"/>
                <div className={s.information}>
                    <p>Name: {profile.fullName}</p>
                    <HookUserStatus status={status} updateStatus={setNewStatusThunkCreator}/>
                    <p>facebook: {profile.contacts.facebook}</p>
                    <p>Online</p>
                </div>
            </div>
        </div>
}

export default ProfileInfo;