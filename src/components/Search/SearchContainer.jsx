import React from 'react';
import {
    follow, followUserThunkCreator, getUsersThunkCreator,
    setCurrentPage,
    setFetching,
    setTotalCount,
    setUsers,
    toggleFollowing,
    unfollow, unfollowUserThunkCreator
} from "../../redux/search-reducer";
import {connect} from "react-redux";
import User from "./User";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";

class UsersContainer extends React.PureComponent {
    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.searchPage.currentPage, this.props.searchPage.pageSize);
    }

    updatePage = (page) => {
        this.props.setCurrentPage(page);
        this.props.getUsersThunkCreator(page, this.props.searchPage.pageSize);
    };

    render() {
        let {isFetching} = this.props.searchPage;

        return <div>
            {isFetching
                ? <Preloader isFetching={isFetching}/>
                : <User {...this.props} updatePage={this.updatePage}/>
            }
        </div>;
    }
}

let withAuthRedirectContainer = withAuthRedirect(UsersContainer);

let mapStateToProps = (state) => {
    return {
        searchPage: state.searchPage,
    };
};

const dispatchToProps = { follow, unfollow,
    setCurrentPage, toggleFollowing, getUsersThunkCreator,
    followUserThunkCreator, unfollowUserThunkCreator
};

export default connect(mapStateToProps, dispatchToProps)(withAuthRedirectContainer);