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
import {withRouter} from 'react-router';
import {compose} from "redux";

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
        this.props.getStatusThunkCreator(userId);
    }

    render() {
        return <Profile {...this.props} />;
    }
}

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isFetching: state.searchPage.isFetching
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