import React from 'react';
import {
    follow,
    followUserThunkCreator,
    getUsersThunkCreator,
    setCurrentPage,
    toggleFollowing,
    unfollow,
    unfollowUserThunkCreator
} from "../../redux/search-reducer";
import {connect} from "react-redux";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {
    getCurrentPage,
    getIsFetching,
    getIsFollowing,
    getPageSize,
    getTotalUserCount,
    getUsers
} from "../../redux/users-selectors";

class UsersContainer extends React.PureComponent {
    componentDidMount() {
        let {currentPage, pageSize} = this.props;
        this.props.getUsersThunkCreator(currentPage, pageSize);
    }

    updatePage = (page) => {
        const {pageSize} = this.props
        this.props.setCurrentPage(page);
        this.props.getUsersThunkCreator(page, pageSize);
    };

    render() {
        let {isFetching} = this.props;

        return <div>
            {isFetching
                ? <Preloader isFetching={isFetching}/>
                : <Users {...this.props} updatePage={this.updatePage}/>
            }
        </div>;
    }
}

let withAuthRedirectContainer = withAuthRedirect(UsersContainer);

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUserCount: getTotalUserCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowing: getIsFollowing(state)
    };
};

const dispatchToProps = { follow, unfollow,
    setCurrentPage, toggleFollowing, getUsersThunkCreator,
    followUserThunkCreator, unfollowUserThunkCreator
};

export default connect(mapStateToProps, dispatchToProps)(withAuthRedirectContainer);