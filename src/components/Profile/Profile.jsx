import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../common/Preloader/Preloader";

const Profile = (props) => {
    // если у нас профиль еще пустой, тогда показываем прелоудер
    if (Object.keys(props.profile).length === 0) {
        return <Preloader isFetching={props.isFetching} />;
    }
    return (
        <div>
            <ProfileInfo {...props} />
            <MyPostsContainer />
        </div>
    );
}

export default Profile;