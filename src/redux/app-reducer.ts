import {setUserThunkCreator} from "./auth-reducer"
import {BaseThunkType, InferActionsTypes} from "./redux-store"
import {getUsersThunkCreator} from "./search-reducer"
import {actions as  actionsAside, AuthActionsType} from './aside-reducer';
import {usersAPI} from "../api/users-api";

let initialState = {
    initialized: false
}
export type InitialSateType = typeof initialState

const appReducer = (state = initialState, action: ActionsTypes): InitialSateType => {
    switch (action.type) {
        case "SN/APP/INITIALIZED_SUCCESS": {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state
    }
}


export const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}
type ActionsTypes = InferActionsTypes<typeof actions>

export const initializeApp = (): BaseThunkType<ActionsTypes | AuthActionsType> => async (dispatch) => {
    // авторизируем пользователя. санка возвращает нам промис. мы его дожидаемся и ставим что мы авторизировали пользователя
    // посылаем запрос на аус ми
    let setUserPromise = await dispatch(setUserThunkCreator())
    let newUsers = await usersAPI.getUsers(1,3)
    let setNewUsers = await dispatch(actionsAside.setNewUsers(newUsers.items))
    // наше приложение авторизировано, если у нас выполнились все пропимы
    Promise.all([setUserPromise, setNewUsers])
        .then(() => dispatch(actions.initializedSuccess()))
}

export default appReducer