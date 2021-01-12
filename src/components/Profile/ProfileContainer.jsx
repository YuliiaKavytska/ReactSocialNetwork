import React from 'react';
import Profile from "./Profile";
import * as axios from "axios";
import {connect} from "react-redux";
import {addPost, setUserProfile, updatePost} from "../../redux/profile-reducer";
import {setFetching} from "../../redux/search-reducer";

class ProfileContainer extends React.PureComponent {
    componentDidMount() {
        if (!this.props.isFetching) {
            this.props.setFetching();
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfile(response.data);
                this.props.setFetching();
            });
    }

    render() {
        return <Profile {...this.props} />;
    }
}

const mapStateToProps = (state) => ({profile: state.profilePage.profile, isFetching: state.searchPage.isFetching});

let dispatchToProps = {addPost, updatePost, setUserProfile, setFetching};

export default connect(mapStateToProps, dispatchToProps)(ProfileContainer);