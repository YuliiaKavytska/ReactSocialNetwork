import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    addPost,
    getStatusThunkCreator,
    getUserProfileThunkCreator, savePhoto,
    setNewStatusThunkCreator, setProfileTC,
    setUserProfile
} from "../../redux/profile-reducer";
import {setFetching} from "../../redux/search-reducer";
import {withRouter} from 'react-router';
import {compose} from "redux";

class ProfileContainer extends React.PureComponent {

    refreshProfile = () => {
        if (!this.props.isFetching) {
            this.props.setFetching();
        }
        // вот для чео нам нужен виз роутер. чтобы получить айди с ссылки и сделать запрос
        this.userId = this.props.match.params.user_id;
        if (!this.userId) {
            this.userId = this.props.userId;
            if (!this.userId) this.props.history.push('/login')
        }
        // 13886
        this.props.getUserProfileThunkCreator(this.userId);
        this.props.getStatusThunkCreator(this.userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.user_id !== this.props.match.params.user_id) {
            this.refreshProfile();
        }
    }

    render() {
        return <Profile {...this.props} isOwner={!this.props.match.params.user_id} />;
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isFetching: state.searchPage.isFetching,
    userId: state.auth.id,
    isAuth: state.auth.isAuth,
});

let dispatchToProps = {
    addPost,
    setUserProfile,
    setFetching,
    getUserProfileThunkCreator,
    getStatusThunkCreator,
    setNewStatusThunkCreator,
    savePhoto,
    setProfileTC
};

export default compose(
    connect(mapStateToProps, dispatchToProps),
    withRouter
    )(ProfileContainer);