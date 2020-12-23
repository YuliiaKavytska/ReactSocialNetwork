const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let store = {
    _state: {
        profilePage: {
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
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Alina'},
                {id: 2, name: 'Nastya'},
                {id: 3, name: 'Sasha'},
                {id: 4, name: 'Daria'},
                {id: 5, name: 'Sveta'},
                {id: 6, name: 'Misha'}
            ],
            messages: [
                {id: 1, sender: 1, name: 'Yuliia', message: 'Hello!'},
                {id: 2, sender: 0, name: 'Alina', message: 'How are you!'},
                {id: 3, sender: 0, name: 'Alina', message: 'Are you studying React?'},
                {id: 4, sender: 1, name: 'Yuliia', message: 'Yeah!'}
            ],
            newMessageText: ''
        },
        aside: {
            favUsers: [
                {id: 1, name: 'Yuliia'},
                {id: 2, name: 'Nastya'},
                {id: 3, name: 'Sasha'}
            ]
        }
    },
    _createEntirePage() {
        console.log('hi');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._createEntirePage = observer;
    },
    dispatch(action) {
        if (action.type === ADD_POST) {
            let newPost = {
                id: this._state.profilePage.posts.length + 1,
                message: this._state.profilePage.newPostText,
                likes: 0
            }
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._createEntirePage(this._state);
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.text;
            this._createEntirePage(this._state);
        } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
            this._state.dialogsPage.newMessageText = action.text;
            this._createEntirePage(this._state);
        } else if (action.type === ADD_MESSAGE) {
            let message = {
                id: this._state.dialogsPage.messages.length + 1,
                sender: 1,
                name: 'Yuliia',
                message: this._state.dialogsPage.newMessageText
            }

            this._state.dialogsPage.messages.push(message);
            this._state.dialogsPage.newMessageText = '';
            this._createEntirePage(this._state);
        }
    }
};
export default store;

export const addPostActionCreator = () => ({ type: ADD_POST });

export const updatePostActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, text: text})

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE });

export const updateMessageActionCreator = (text) => ({ type: UPDATE_NEW_MESSAGE_TEXT, text: text})

window.store = store;