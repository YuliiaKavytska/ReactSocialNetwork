const ADD_MESSAGE = 'ADD-MESSAGE';

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
    ]
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
                    message: action.message
                }],
            };
        default:
            return state;
    }
}

export const addMessage = (message) => ({type: ADD_MESSAGE, message});

export default dialogsReducer;
