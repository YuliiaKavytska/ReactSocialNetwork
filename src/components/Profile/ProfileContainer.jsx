import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {addPost, getUserProfileThunkCreator, setUserProfile, updatePost} from "../../redux/profile-reducer";
import {setFetching} from "../../redux/search-reducer";
import {withRouter} from 'react-router';
import {profileAPI} from "../../api/api";

class ProfileContainer extends React.PureComponent {
    componentDidMount() {
        if (!this.props.isFetching) {
            this.props.setFetching();
        }
        // вот для чео нам нужен виз роутер. чтобы получить айди с ссылки и сделать запрос
        let userId = this.props.match.params.user_id;
        if (!userId) userId = 2;
        // 13886
        this.props.getUserProfileThunkCreator(userId);
    }

    render() {
        return <Profile {...this.props} />;
    }
}

const mapStateToProps = (state) => ({profile: state.profilePage.profile, isFetching: state.searchPage.isFetching});

let dispatchToProps = {addPost, updatePost, setUserProfile, setFetching, getUserProfileThunkCreator};

let withUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, dispatchToProps)(withUrlDataContainerComponent);