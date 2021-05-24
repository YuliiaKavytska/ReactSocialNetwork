import React from 'react';
import s from "./Search.module.css";
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/photo.png";
import {UserType} from "../../types/types";
import {useDispatch, useSelector} from "react-redux";
import {getIsFollowing} from "../../redux/users-selectors";
import {followUserThunkCreator, unfollowUserThunkCreator} from "../../redux/search-reducer";

interface IProps {
    user: UserType
}

const User: React.FC<IProps> = ({user}) => {
    const isFollowing = useSelector(getIsFollowing)
    const dispatch = useDispatch()

    return <div className={s.user_item}>
        <div className={s.image_cont}>
            <NavLink to={'/profile/' + user.id}>
                <img src={user.photos.large || userPhoto} className={s.user_image} />
            </NavLink>
        </div>
        <div className={s.main_info}>
            <div className={s.name}>{user.name}</div>
            <div className={s.status}>{user.status}</div>
            {user.followed
                ? <button
                    className={s.follow}
                    onClick={() => dispatch(unfollowUserThunkCreator(user.id))}
                    disabled={isFollowing.some(e => e === user.id)}
                >Unfollow</button>
                : <button
                    className={s.follow}
                    onClick={() => dispatch(followUserThunkCreator(user.id))}
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