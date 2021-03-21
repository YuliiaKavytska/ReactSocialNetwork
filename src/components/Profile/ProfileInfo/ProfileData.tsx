import s from "./ProfileInfo.module.css"
import HookUserStatus from "./HookUserStatus"
import React from "react"
import {ProfileType} from "../../../types/types"

interface IProps {
    profile: ProfileType
    status: string | null
    isOwner: boolean
    onMainPhotoSelected: (e: React.ChangeEvent<HTMLInputElement>) => void
    setNewStatusThunkCreator: (status: string) => void
}

const ProfileData: React.FC<IProps> = ({
                                           profile,
                                           status,
                                           isOwner,
                                           onMainPhotoSelected,
                                           setNewStatusThunkCreator
                                       }) => {
    return <div className={s.information}>
        <p><b>Name:</b> {profile.fullName}</p>
        <HookUserStatus ProfileStatus={status} updateStatus={setNewStatusThunkCreator}/>
        <p><b>Looking for a job:</b> {profile.lookingForAJob ? 'Yes' : 'No'}</p>
        <p><b>My professional skills:</b> {profile.lookingForAJobDescription}</p>
        <div className={s.constacts}>
            {Object.keys(profile.contacts).map((key) => (
                <Contact key={key} socialMedia={key} socialValue={profile.contacts[key]}/>
            ))}
        </div>
        <b>New photo: </b>
        {isOwner && <input
            type='file'
            accept=".jpg, .jpeg, .png"
            className={s.button}
            onChange={onMainPhotoSelected}/>}
    </div>
}

interface IContact {
    socialMedia: string,
    socialValue: string
}

const Contact = ({socialMedia, socialValue}: IContact) => {
    return <p><b>{socialMedia}:</b> {socialValue}</p>
}


export default ProfileData