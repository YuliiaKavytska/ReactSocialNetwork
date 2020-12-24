const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

const dialogsReducer = (state, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let message = {
                id: state.messages.length + 1,
                sender: 1,
                name: 'Yuliia',
                message: state.newMessageText
            }
            state.messages.push(message);
            state.newMessageText = '';
            return state;
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.text;
            return state;
        default:
            return state;
    }
}

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE });

export const updateMessageActionCreator = (text) => ({ type: UPDATE_NEW_MESSAGE_TEXT, text: text})

export default dialogsReducer;