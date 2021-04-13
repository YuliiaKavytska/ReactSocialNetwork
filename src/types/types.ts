export type UserType = {
    name: string
    id: number
    photos: PhotosType
    status: string
    followed: boolean
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ReqDataType = Omit<ProfileMainInfoType, 'userId'> & ContactsType
export type ProfileType = ProfileMainInfoType & {
    contacts: ContactsType,
    photos: PhotosType
}
export type ProfileMainInfoType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
    [key: string]: string
}
export type PostType = {
    id: number
    message: string
    likes: number
}
export type FavUserType = {
    id: number
    name: string
}
export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    sender: number
    name: string
    message: string
}
