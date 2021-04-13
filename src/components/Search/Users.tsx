import React from 'react';
import s from './Search.module.css';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from '../../types/types';
import UsersSearchForm from "./UsersSearchForm";
import {FilterType} from "../../redux/search-reducer";

interface IProps {
    totalUserCount: number
    pageSize: number
    currentPage: number
    filter: FilterType
    users: Array<UserType>
    isFollowing: Array<number>
    updatePage: (page: number) => void
    unfollowUserThunkCreator: (id: number) => void
    followUserThunkCreator: (id: number) => void
    onFilterChanged: (filter: FilterType) => void
}

const Users: React.FC<IProps> = ({
                                     totalUserCount, pageSize,
                                     currentPage, users,
                                     isFollowing, onFilterChanged,
                                     updatePage, filter,
                                     followUserThunkCreator, unfollowUserThunkCreator
                                 }) => {
    return <div className={s.wrapper}>
        <UsersSearchForm filter={filter} onFilterChanged={onFilterChanged} />
        <Paginator updatePage={updatePage}
                   totalItemCount={totalUserCount}
                   pageSize={pageSize}
                   currentPage={currentPage}/>
        <div className={s.users}>
            {users.map(user => (
                <User
                    key={user.id}
                    user={user}
                    isFollowing={isFollowing}
                    unfollowUserThunkCreator={unfollowUserThunkCreator}
                    followUserThunkCreator={followUserThunkCreator}
                />))
            }
        </div>
        <button className={s.show_more}>Show more</button>
    </div>;
}

export default Users;