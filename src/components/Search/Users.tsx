import React from 'react';
import s from './Search.module.css';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UserType } from '../../types/types';

interface IProps {
    totalUserCount: number
    pageSize: number
    currentPage: number
    users: Array<UserType>
    isFollowing: Array<number>
    updatePage: (page: number) => void
    unfollowUserThunkCreator: (id: number) => void
    followUserThunkCreator: (id: number) => void
}

const Users: React.FC<IProps> = ({totalUserCount, pageSize, currentPage, users, isFollowing, ...props}) => {
    return <div className={s.wrapper}>
            <Paginator updatePage ={props.updatePage}
                       totalItemCount={totalUserCount}
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