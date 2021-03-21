import React, {ChangeEvent, useState} from 'react'
import s from './ProfileInfo.module.css'
import ProfileData from "./ProfileData"
import ProfileDataFormContainer from "./ProfileDataForm"
import img from '../../../assets/images/photo.png'
import {ProfileType, ReqDataType} from "../../../types/types"

interface IProps {
    profile: ProfileType | null
    status: string | null
    isOwner: boolean
    setNewStatusThunkCreator: (status: string) => void
    savePhoto: (photo: File) => void
    setProfileTC: (profileData: ReqDataType) => Promise<any>
}

// type IProps = ProfileContainerPropsType & { isOwner: boolean }
const ProfileInfo: React.FC<IProps> = ({
                                           profile,
                                           status,
                                           isOwner,
                                           setNewStatusThunkCreator,
                                           savePhoto,
                                           setProfileTC
                                       }) => {
    const [editMode, setEditMode] = useState(false)

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files == null) {
            throw new Error("Error finding e.target.files")
        }
        if (e.target.files?.length)
            savePhoto(e.target.files[0])
    }

    const onSubmit = (formData: ReqDataType) => {
        // todo: remove then !!!!
        let promise: any = setProfileTC(formData)
        promise.then(() => {
            setEditMode(i => !i)
        })
    }

    return <div className={s.mainInformation}>
        <div className={s.mainInfoBlock}>
            <div>
                <img src={profile?.photos.large || img} alt="ava"/>
                {isOwner && !editMode && <button
                    className={s.button + ' ' + s.editing_btn}
                    onClick={() => setEditMode(i => !i)}>
                    Edit mode
                </button>}
            </div>
            {editMode
                ? <ProfileDataFormContainer values={profile as ProfileType}
                                            status={status}
                                            isOwner={isOwner}
                                            onSubmit={onSubmit}
                                            onMainPhotoSelected={onMainPhotoSelected}
                />
                : <ProfileData profile={profile as ProfileType}
                               status={status}
                               isOwner={isOwner}
                               onMainPhotoSelected={onMainPhotoSelected}
                               setNewStatusThunkCreator={setNewStatusThunkCreator}/>
            }
        </div>
    </div>
}

export default ProfileInfo