import React, {ComponentType} from 'react'
import {
    actions, FilterType,
    followUserThunkCreator,
    getUsersThunkCreator,
    unfollowUserThunkCreator
} from "../../redux/search-reducer"
import {connect} from "react-redux"
import Users from "./Users"
import Preloader from "../common/Preloader/Preloader"
import {withAuthRedirect} from "../hoc/withAuthRedirect"
import {
    getCurrentPage, getFilter,
    getIsFetching,
    getIsFollowing,
    getPageSize,
    getTotalUserCount,
    getUsers
} from "../../redux/users-selectors"
import {compose} from "redux"
import {StateType} from '../../redux/redux-store'
import {UserType} from "../../types/types";

class UsersContainer extends React.PureComponent<PropsType> {
    componentDidMount() {
        let {currentPage, pageSize, filter} = this.props
        this.props.getUsersThunkCreator(currentPage, pageSize, filter.term, filter.friend)
    }

    updatePage = (page: number): void => {
        const {pageSize, filter} = this.props
        this.props.setCurrentPage(page)
        this.props.getUsersThunkCreator(page, pageSize, filter.term, filter.friend)
    }

    onFilterChanged = (filter: FilterType) => {
        const {pageSize} = this.props
        this.props.getUsersThunkCreator(1, pageSize, filter.term, filter.friend)
    }

    render() {
        let {isFetching} = this.props

        return <div>
            {isFetching
                ? <Preloader/>
                : <Users {...this.props} updatePage={this.updatePage} onFilterChanged={this.onFilterChanged} />
            }
        </div>
    }
}

const mapStateToProps = (state: StateType): MapStateToProps => ({
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUserCount: getTotalUserCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    isFollowing: getIsFollowing(state),
    filter: getFilter(state)
})


const dispatchToProps = {
    follow: actions.follow,
    unfollow: actions.unfollow,
    setCurrentPage: actions.setCurrentPage,
    toggleFollowing: actions.toggleFollowing,
    getUsersThunkCreator,
    followUserThunkCreator, unfollowUserThunkCreator
}

// type StateProps = ReturnType<typeof mapStateToProps>
// type DispatchProps = typeof dispatchToProps
type MapStateToProps = {
    totalUserCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    users: Array<UserType>
    isFollowing: Array<number>
    filter: FilterType
}
type DispatchProps = {
    unfollowUserThunkCreator: (id: number) => void
    followUserThunkCreator: (id: number) => void
    getUsersThunkCreator: (currentPage: number, pageSize: number, term: string, friend: boolean | null) => void
    setCurrentPage: (page: number) => void
}
type OwnPropsType = {
    // здесь будут пропсы которые придут из вне. тоесть из апп компоненты
}

type PropsType = MapStateToProps & DispatchProps & OwnPropsType

export default compose<ComponentType>(
    connect<MapStateToProps, DispatchProps, OwnPropsType, StateType>(mapStateToProps, dispatchToProps),
    withAuthRedirect
)(UsersContainer)