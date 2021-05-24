import React, {useEffect} from 'react'
import {getUsersThunkCreator} from "../../redux/search-reducer"
import {useDispatch, useSelector} from "react-redux"
import Users from "./Users"
import Preloader from "../common/Preloader/Preloader"
import {withAuthRedirect} from "../hoc/withAuthRedirect"
import {getCurrentPage, getFilter, getIsFetching, getPageSize} from "../../redux/users-selectors"


const UsersPage: React.FC = () => {
    const isFetching = useSelector(getIsFetching)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getFilter)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsersThunkCreator(currentPage, pageSize, filter.term, filter.friend))
    }, [])

    return (
        <div>
            {isFetching ? <Preloader /> : <Users />}
        </div>
    )
}

export default withAuthRedirect(UsersPage)

