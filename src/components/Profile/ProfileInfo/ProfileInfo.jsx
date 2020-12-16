import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
    return (
        <div className={s.mainInformation}>
            <div className={s.mainInfoBlock}>
                <img src="https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png" alt=""/>
                <div className={s.information}>
                    <p>Name</p>
                    <p>Birth</p>
                    <p>Online</p>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;