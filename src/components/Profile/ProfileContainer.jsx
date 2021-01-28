import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    addPost,
    getStatusThunkCreator,
    getUserProfileThunkCreator,
    setNewStatusThunkCreator,
    setUserProfile
} from "../../redux/profile-reducer";
import {setFetching} from "../../redux/search-reducer";
import {Redirect, withRouter} from 'react-router';
import {compose} from "redux";

class ProfileContainer extends React.PureComponent {
    componentDidMount() {
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

    render() {
        return <Profile {...this.props} />;
    }
}

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

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
    setNewStatusThunkCreator};

// let withUrlDataContainerComponent = withRouter(AuthRedirectComponent);
//
// export default connect(mapStateToProps, dispatchToProps)(withUrlDataContainerComponent);

export default compose(
    connect(mapStateToProps, dispatchToProps),
    withRouter
    )(ProfileContainer);