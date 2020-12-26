const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
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
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {
                    id: state.messages.length + 1,
                    sender: 1,
                    name: 'Yuliia',
                    message: state.newMessageText
                }],
                newMessageText: ''
            };
        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.text
            }
        default:
            return state;
    }
}

export const addMessageActionCreator = () => ({type: ADD_MESSAGE});

export const updateMessageActionCreator = (text) => ({type: UPDATE_NEW_MESSAGE_TEXT, text: text})

export default dialogsReducer;
