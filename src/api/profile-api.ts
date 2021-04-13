import { RespT } from "../types/api-types";
import {PhotosType, ProfileType, ReqDataType} from "../types/types";
import {instance} from "./api";

type ResSavePhoto = {photos: PhotosType}

export const profileAPI = {
    getUserProfile(userId: number | null) {
        return instance.get<ProfileType>(`/profile/${userId}`).then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>('/profile/status/' + userId).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<RespT>('/profile/status', {status}).then(res => res.data)
    },
    setNewPhoto(image: File) {
        const formData = new FormData()
        formData.append('image', image)
        return instance.put<RespT<ResSavePhoto>>('/profile/photo', formData, {
            headers: {'Content-type': 'multipart/form-data'}
        }).then(res => res.data)
    },
    updateProfile(profileData: ProfileType) {
        return instance.put<RespT>('/profile', profileData).then(res => res.data)
    }
}