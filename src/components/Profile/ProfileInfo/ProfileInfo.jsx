import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
    return (
        <div className={s.mainInformation}>
            <div className={s.mainInfoBlock}>
                <img src={props.profile.photos.large
                    ? props.profile.photos.large
                    : "https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png"} alt="ava"/>
                <div className={s.information}>
                    <p>Name: {props.profile.fullName}</p>
                    <p>About: {props.profile.aboutMe}</p>
                    <p>facebook: {props.profile.contacts.facebook}</p>
                    <p>Online</p>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;