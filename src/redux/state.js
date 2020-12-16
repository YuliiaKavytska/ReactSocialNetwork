// import {createEntirePage} from "../render";

let createEntirePage = () => {
    console.log('hi');
}

let state = {
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
        newPostText: 'This is new text'
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
}

window.state = state;

export const addNewPost = () => {
    let newPost = {
        id: state.profilePage.posts.length + 1,
        message: state.profilePage.newPostText,
        likes: 0
    }

    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = '';
    createEntirePage(state);
}

export const updateNewPostText = (text) => {
    state.profilePage.newPostText = text;
    createEntirePage(state);
}

export const updateMessageText = (text) => {
    state.dialogsPage.newMessageText = text;
    createEntirePage(state);
}

export const sendMessage = () => {
    let message = {
        id: state.dialogsPage.messages.length + 1,
        sender: 1,
        name: 'Yuliia',
        message: state.dialogsPage.newMessageText
    }

    state.dialogsPage.messages.push(message);
    state.dialogsPage.newMessageText = '';
    createEntirePage(state);
}

export const subscribe = (observer) => {
    createEntirePage = observer;
}

export default state;