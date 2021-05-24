import {FormAction, stopSubmit} from "redux-form"
import {PhotosType, PostType, ProfileType, ReqDataType} from "../types/types"
import {BaseThunkType, InferActionsTypes, StateType} from "./redux-store"
import {profileAPI} from "../api/profile-api"
import {ResponseResultCodes} from "../types/api-types"
import {actions as SearchAction} from './search-reducer';

let initialState = {
    profile: null as ProfileType | null,
    status: null as string | null,
    posts: [
        {id: 1, message: 'Hi everyone', likes: 12},
        {id: 2, message: 'Im learning React', likes: 2},
        {id: 3, message: 'Im so cute', likes: 132},
        {id: 5, message: 'Im genius', likes: 16},
        {id: 6, message: 'Im genius', likes: 16},
        {id: 7, message: 'Im genius', likes: 16},
        {id: 8, message: 'Im genius', likes: 16},
        {id: 9, message: 'Im genius', likes: 16},
        {id: 11, message: 'Im genius', likes: 16},
        {id: 12, message: 'Im genius', likes: 16},
        {id: 13, message: 'Im genius', likes: 16},
        {id: 14, message: 'Im genius', likes: 16},
        {id: 15, message: 'Im genius', likes: 16}
    ] as Array<PostType>
}

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "SN/PROFILE/ADD-POST":
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {
                        id: state.posts[state.posts.length - 1].id + 1,
                        message: action.text,
                        likes: 0
                    }
                ]
            }
        case "SN/PROFILE/SET_USER_PROFILE":
            return {
                ...state,
                profile: action.profile,
            }
        case "SN/PROFILE/SET_STATUS":
            return {
                ...state,
                status: action.status,
            }
        case "SN/PROFILE/UPDATE_STATUS":
            return {
                ...state,
                status: action.status,
            }
        case "SN/PROFILE/DELETE_POST":
            return {
                ...state,
                posts: state.posts.filter(item => item.id !== action.id)
            }
        case "SN/PROFILE/UPDATE_PHOTO":
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                } as ProfileType
            }
        default:
            return state
    }
}
export default profileReducer

export const actions = {
    addPost: (text: string) => ({type: 'SN/PROFILE/ADD-POST', text} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
    setNewStatus: (status: string) => ({type: 'SN/PROFILE/UPDATE_STATUS', status} as const),
    deletePost: (id: number) => ({type: 'SN/PROFILE/DELETE_POST', id} as const),
    updatePhoto: (photos: PhotosType) => ({type: 'SN/PROFILE/UPDATE_PHOTO', photos} as const)
}

export const getUserProfileThunkCreator = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getUserProfile(userId)
    dispatch(actions.setUserProfile(data))
    dispatch(SearchAction.setFetching())
}

export const getStatusThunkCreator = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(response))
}

export const setNewStatusThunkCreator = (status: string): ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResponseResultCodes.Success) dispatch(actions.setNewStatus(status))
    } catch (error) {
        // обработка ошибки. персонализированый алерт. диспачим наличине ошибки в стор.
        // делаем новую санку которая будет включать ошибку и по таймеру ее выключать
    }
}

export const savePhoto = (photo: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.setNewPhoto(photo)
    if (data.resultCode === ResponseResultCodes.Success) dispatch(actions.updatePhoto(data.data.photos))
}

export const setProfileTC = (profileData: ProfileType): BaseThunkType<ActionTypes | FormAction, Promise<any>> =>
    async (dispatch, getState) => {
    const userId = getState().auth.id
    const data = await profileAPI.updateProfile(profileData)
    if (data.resultCode === ResponseResultCodes.Success) {
        if (userId) {
            return await dispatch(getUserProfileThunkCreator(userId))
        } else {
            throw new Error('User ID can`t be nullable')
        }
    } else {
        type MediaObjectType = {
            [name: string]: string
        }
        const mediaObject: MediaObjectType = {}
        for (let item of data.messages) {
            let media: string | Array<string> = item.split('')
            media.pop()
            media = media.join('').split('->')
            media.shift()
            media = media.toString().toLowerCase()
            mediaObject[media] = item
        }
        dispatch(stopSubmit('profileInfo', {'contacts': mediaObject}))
        return Promise.reject(data.messages[0])
    }
}

type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes | FormAction>
