import {DialogType, MessageType} from "../types/types";
import {InferActionsTypes} from "./redux-store";


let initialState = {
    dialogs: [
        {id: 1, name: 'Alina'},
        {id: 2, name: 'Nastya'},
        {id: 3, name: 'Sasha'},
        {id: 4, name: 'Daria'},
        {id: 5, name: 'Sveta'},
        {id: 6, name: 'Misha'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, sender: 1, name: 'Yuliia', message: 'Hello!'},
        {id: 2, sender: 0, name: 'Alina', message: 'How are you!'},
        {id: 3, sender: 0, name: 'Alina', message: 'Are you studying React?'},
        {id: 4, sender: 1, name: 'Yuliia', message: 'Yeah!'}
    ] as Array<MessageType>
}


const dialogsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/ADD-MESSAGE':
            return {
                ...state,
                messages: [...state.messages, {
                    id: state.messages.length + 1,
                    sender: 1,
                    name: 'Yuliia',
                    message: action.message
                }],
            }
        default:
            return state
    }
}
export default dialogsReducer

export const actions = {
    addMessage: (message: string) => ({type: 'SN/DIALOGS/ADD-MESSAGE', message} as const)
}

export type  InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>
