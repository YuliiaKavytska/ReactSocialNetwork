import {profileAPI} from "../api/api";
import {setFetching} from "./search-reducer";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const UPDATE_STATUS = 'UPDATE_STATUS';

let initialState = {
    profile: { },
    status: '',
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
    ]
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
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
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile,
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status,
            };
        case UPDATE_STATUS:
            return {
                ...state,
                status: action.status,
            }
        default:
            return state;
    }
}

export const addPost = (text) => ({type: ADD_POST, text});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const setNewStatus = (status) => ({type: UPDATE_STATUS, status});

export default profileReducer;

export const getUserProfileThunkCreator = (userId) => (dispatch) => {
    profileAPI.getUserProfile(userId).then(data => {
        dispatch(setUserProfile(data));
        dispatch(setFetching());
    });
}

export const getStatusThunkCreator = (userId) => (dispatch) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setStatus(response.data));
    })
};

export const setNewStatusThunkCreator = (status) => (dispatch) => {
    profileAPI.updateStatus(status).then(response => {
        if (response.data.resultCode === 0)
            dispatch(setNewStatus(status));
    });
}