import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import asideReducer from "./aside-reducer";

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

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.aside = asideReducer(this._state.aside, action);

        this._createEntirePage(this._state);
    }
};

export default store;

window.store = store;