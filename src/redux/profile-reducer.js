import {profileAPI} from "../api/api";
import {setFetching} from "./search-reducer";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
    profile: {

    },
    posts: [
        {id: 1, message: 'Hi everyone', likes: 12},
        {id: 2, message: 'Im learning React', likes: 2},
        {id: 3, message: 'Im so cute', likes: 132},
        {id: 4, message: 'Im genius', likes: 16},
        {id: 4, message: 'Im genius', likes: 16},
        {id: 4, message: 'Im genius', likes: 16},
        {id: 4, message: 'Im genius', likes: 16},
        {id: 4, message: 'Im genius', likes: 16},
        {id: 4, message: 'Im genius', likes: 16},
        {id: 4, message: 'Im genius', likes: 16},
        {id: 4, message: 'Im genius', likes: 16},
        {id: 4, message: 'Im genius', likes: 16},
        {id: 4, message: 'Im genius', likes: 16}
    ],
    newPostText: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {
                        id: state.posts.length + 1,
                        message: state.newPostText,
                        likes: 0
                    }
                ],
                newPostText: ''
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.text
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile,
            }
        default:
            return state;
    }
}

export const addPost = () => ({type: ADD_POST});
export const updatePost = (text) => ({type: UPDATE_NEW_POST_TEXT, text: text});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});

export default profileReducer;

export const getUserProfileThunkCreator = (userId) => (dispatch) => {
    profileAPI.getUserProfile(userId).then(data => {
        dispatch(setUserProfile(data));
        dispatch(setFetching());
    });
}

