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

class UsersContainer extends React.PureComponent {
    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    updatePage = (page) => {
        this.props.setCurrentPage(page);
        this.props.getUsersThunkCreator(page, this.props.pageSize);
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

let mapStateToProps = (state) => {
    return {
        searchPage: state.searchPage,
    };
};

const dispatchToProps = { follow, unfollow,
    setCurrentPage, toggleFollowing, getUsersThunkCreator,
    followUserThunkCreator, unfollowUserThunkCreator
};

export default connect(mapStateToProps, dispatchToProps)(UsersContainer);
