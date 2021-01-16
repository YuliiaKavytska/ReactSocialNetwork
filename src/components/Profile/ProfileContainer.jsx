import React from 'react';
import Profile from "./Profile";
import * as axios from "axios";
import {connect} from "react-redux";
import {addPost, setUserProfile, updatePost} from "../../redux/profile-reducer";
import {setFetching} from "../../redux/search-reducer";
import {withRouter} from 'react-router';
import {profileAPI} from "../../api/api";

class ProfileContainer extends React.PureComponent {
    componentDidMount() {
        if (!this.props.isFetching) {
            this.props.setFetching();
        }
        let userId = this.props.match.params.user_id;
        if (!userId) userId = 2;
        // 13886
        profileAPI.getUserProfile(userId).then(data => {
                this.props.setUserProfile(data);
                this.props.setFetching();
            });
    }

    render() {
        return <Profile {...this.props} />;
    }
}

const mapStateToProps = (state) => ({profile: state.profilePage.profile, isFetching: state.searchPage.isFetching});

let dispatchToProps = {addPost, updatePost, setUserProfile, setFetching};

let withUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, dispatchToProps)(withUrlDataContainerComponent);