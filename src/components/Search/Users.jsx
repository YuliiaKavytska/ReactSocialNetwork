import React from 'react';
import s from './Search.module.css';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = ({totalUserCount, pageSize, currentPage, users, isFollowing, ...props}) => {
    return <div className={s.wrapper}>
            <Paginator updatePage ={props.updatePage}
                       totalUserCount={totalUserCount}
                       pageSize={pageSize}
                       currentPage={currentPage}/>
            <div className={s.users}>
                {users.map(user => (<User
                    key={user.id}
                    user={user}
                    isFollowing={isFollowing}
                    unfollowUserThunkCreator={props.unfollowUserThunkCreator}
                    followUserThunkCreator={props.followUserThunkCreator}
                />))
                }
            </div>
            <button className={s.show_more}>Show more</button>
        </div>;
}

export default Users;