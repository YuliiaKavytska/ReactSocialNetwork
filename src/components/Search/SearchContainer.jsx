import React from 'react';
import {
    follow,
    setCurrentPage,
    setFetching,
    setTotalCount,
    setUsers,
    unfollow
} from "../../redux/search-reducer";
import {connect} from "react-redux";
import User from "./User";
import Preloader from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";

class UsersContainer extends React.PureComponent {
    componentDidMount() {
        if (!this.props.searchPage.isFetching) {
            this.props.setFetching();
        }
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.setUsers(data.items);
            this.props.setTotalCount(data.totalCount);
            this.props.setFetching();
        });
    }

    updatePage = (page) => {
        this.props.setCurrentPage(page);
        if (!this.props.searchPage.setFetching) {
            this.props.setFetching();
        }
        usersAPI.getUsers(page, this.props.pageSize).then(data => {
            this.props.setUsers(data.items);
            this.props.setFetching();
        });
    };

    render() {
        let {isFetching} = this.props.searchPage;

        return <div>
            {isFetching
                ? <Preloader isFetching={isFetching}/>
                : <User
                    searchPage={this.props.searchPage}
                    updatePage={this.updatePage}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                />
            }
        </div>;
    }
}

let mapStateToProps = (state) => {
    return {
        searchPage: state.searchPage,
    };
};

const dispatchToProps = {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalCount,
    setFetching,
};

export default connect(mapStateToProps, dispatchToProps)(UsersContainer);
