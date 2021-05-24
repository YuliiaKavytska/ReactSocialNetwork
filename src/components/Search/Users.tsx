import React, {useCallback, useEffect} from 'react';
import s from './Search.module.css';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";
import {actions, FilterType, getUsersThunkCreator} from "../../redux/search-reducer";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPage, getFilter, getPageSize, getTotalUserCount, getUsers} from "../../redux/users-selectors";
import {useHistory} from "react-router";
import * as queryString from "querystring";

type SearchQuery = { term?: string, page?: string, friend?: string };

const Users: React.FC = () => {

    const users = useSelector(getUsers)
    const pageSize = useSelector(getPageSize)
    const totalUserCount = useSelector(getTotalUserCount)
    const currentPage = useSelector(getCurrentPage)
    const filter = useSelector(getFilter)

    const dispatch = useDispatch()
    const history = useHistory()

    const updatePage = useCallback((page: number) => {
        dispatch(actions.setCurrentPage(page))
    }, [])

    const onFilterChanged = useCallback((filter: FilterType) => {
        dispatch(getUsersThunkCreator(1, pageSize, filter.term, filter.friend))
    }, [pageSize])

    let initialValues: {term: string, friend: 'null' | 'true' | 'false'} = {term: '', friend: 'null'}

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.slice(1)) as SearchQuery
        let actualFilter = filter
        const actualPage = Number(parsed['page']) || currentPage

        switch (parsed.friend) {
            case 'null':
                actualFilter = {...filter, friend: null}
                break;
            case 'true':
                actualFilter = {...filter, friend: true}
                break;
            case 'false':
                actualFilter = {...filter, friend: false}
                break;
        }

        actualFilter = parsed['term'] ? {...filter, term: parsed['term']} : filter

        dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter.term, actualFilter.friend))

        initialValues = {
            term: actualFilter.term,
            friend: String(actualFilter.friend) as 'null' | 'true' | 'false'
        }
    }, [])

    useEffect(() => {
        const query: SearchQuery = {}

        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage != 1) query.page = String(currentPage)

        history.push({
            pathname: '/search',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

    return <div className={s.wrapper}>
        <UsersSearchForm filter={initialValues} onFilterChanged={onFilterChanged} />
        <Paginator updatePage={updatePage}
                   totalItemCount={totalUserCount}
                   pageSize={pageSize}
                   currentPage={currentPage} />
        <div className={s.users}>
            {users.map(user => <User key={user.id} user={user} />)}
        </div>
        <button className={s.show_more}>Show more</button>
    </div>;
}

export default Users;