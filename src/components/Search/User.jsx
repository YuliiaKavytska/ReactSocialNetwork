import React from 'react';
import s from "./Search.module.css";
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/photo.png";

const User = ({user, isFollowing, ...props}) => {
    return <div className={s.user_item}>
        <div className={s.image_cont}>
            <NavLink to={'/profile/' + user.id}>
                <img src={userPhoto || user.photos.small} className={s.user_image}/>
            </NavLink>
        </div>
        <div className={s.main_info}>
            <div className={s.name}>{user.name}</div>
            <div className={s.status}>{user.status}</div>
            {user.followed
                ? <button
                    className={s.follow}
                    onClick={() => props.unfollowUserThunkCreator(user.id)}
                    disabled={isFollowing.some(e => e === user.id)}
                >Unfollow</button>
                : <button
                    className={s.follow}
                    onClick={() => props.followUserThunkCreator(user.id)}
                    disabled={isFollowing.some(e => e === user.id)}
                >Follow</button>}
        </div>
        <div className={s.location}>
            <div className={s.country}>{'user.location.country'}</div>
            <div className={s.city}>{'user.location.city'}</div>
        </div>
    </div>
}

export default User;