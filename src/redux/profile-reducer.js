const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
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
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({type: ADD_POST});

export const updatePostActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, text: text})

export default profileReducer;