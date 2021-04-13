import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../common/Preloader/Preloader";
import {ProfileType, ReqDataType} from '../../types/types';
import { ProfileContainerPropsType } from './ProfileContainer';

export type ProfilePropsType = {
    isOwner: boolean
    profile: ProfileType | null
    status: string | null
    setNewStatusThunkCreator: (status: string) => void
    savePhoto: (photo: File) => void
    setProfileTC: (profileData: ProfileType) => Promise<any>
}

const Profile: React.FC<ProfilePropsType> = (props) => {
    // если у нас профиль еще пустой, тогда показываем прелоудер
    // Object.keys(props.profile).length === 0 ||
    if (props.profile ===  null) {
        // isFetching={props.isFetching}
        return <Preloader  />;
    }
    return (
        <div>
            <ProfileInfo {...props} />
            <MyPostsContainer />
        </div>
    );
}

export default Profile;