import React from 'react';
import s from './Search.module.css';
import userPhoto from '../../assets/images/photo.png';
import {NavLink} from "react-router-dom";
import {usersAPI} from "../../api/api";
import {setCurrentPage} from "../../redux/search-reducer";

const User = (props) => {
    let {totalUserCount, pageSize, users, currentPage, isFollowing} = props.searchPage;

    let pagesCount = Math.ceil(totalUserCount / pageSize);
    let pagination = [];

    for (let i = 1; i <= pagesCount; i++) {
        pagination.push(i);
    }

    return <div className={s.wrapper}>
            <div className={s.pagination}>
                {pagination.map((i) => (
                    <span
                        key={i}
                        onClick={(e) => {
                            props.updatePage(i)
                        }}
                        className={i === currentPage
                            ? `${s.page} ${s.selectedPage}`
                            : s.page}
                    >
                            {i}
                        </span>
                ))}
            </div>
            <div className={s.users}>
                {users.map(user => (
                    <div key={user.id} className={s.user_item}>
                        <div className={s.image_cont}>
                            <NavLink to={'/profile/' + user.id}>
                                <img src={userPhoto || user.photos.small} alt="photo" className={s.user_image}/>
                            </NavLink>
                        </div>
                        <div className={s.main_info}>
                            <div className={s.name}>{user.name}</div>
                            <div className={s.status}>{user.status}</div>
                            {user.followed
                                ? <button
                                    className={s.follow}
                                    onClick={() =>  props.unfollowUserThunkCreator(user.id)}
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
                    </div>))
                }
            </div>
            <button className={s.show_more}>Show more</button>
        </div>;
}

export default User;