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
import * as axios from "axios";
import User from "./User";
import s from "./Search.module.css";
import Preloader from "../common/Preloader/Preloader";

class UsersContainer extends React.PureComponent {
    componentDidMount() {
        if (!this.props.searchPage.isFetching) {
            this.props.setFetching();
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalCount(response.data.totalCount);
                this.props.setFetching();
            });
    }

    updatePage = (page) => {
        this.props.setCurrentPage(page);
        if (!this.props.searchPage.setFetching) {
            this.props.setFetching();
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setFetching();
            });
    };

    render() {
        let {isFetching} = this.props.searchPage;

        return <div>
            {isFetching
                ? <Preloader isFetching={isFetching} />
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

// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (id) => {
//             dispatch(follow(id));
//         },
//         unfollow: (id) => {
//             dispatch(unfollow(id));
//         },
//         setUsers: (users) => {
//             dispatch(setUsers(users));
//         },
//         updatePage: (page) => {
//             dispatch(setCurrentPage(page));
//         },
//         setTotalCount: (count) => {
//             dispatch(setTotalCount(count));
//         },
//         setLoading: () => {
//             dispatch(setFetching());
//         }
//     }
// };

const dispatchToProps = {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalCount,
    setFetching,
};

export default connect(mapStateToProps, dispatchToProps)(UsersContainer);
