import {FavUserType, UserType} from "../types/types";
import {InferActionsTypes} from "./redux-store";

let initialState = {
    favUsers: [
        // {id: 1, name: 'Yuliia'},
        // {id: 2, name: 'Nastya'},
        // {id: 3, name: 'Sasha'}
    ] as Array<UserType>
}

export type InitialStateType = typeof initialState;

const asideReducer = (state = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/ASIDE/SET_NEW_USERS":
            return {
                ...state,
                favUsers: [...action.users]
            }
        default:
            return state;
    }
}

export const actions = {
    setNewUsers: (users: Array<UserType>) => ({type: 'SN/ASIDE/SET_NEW_USERS', users})
}

export default asideReducer;

export type AuthActionsType = InferActionsTypes<typeof actions>