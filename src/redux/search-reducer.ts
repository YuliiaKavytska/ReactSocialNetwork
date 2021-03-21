import {findUserChanger} from "../components/utils/object-helpers"
import {UserType} from "../types/types"
import {BaseThunkType, InferActionsTypes, StateType} from "./redux-store"
import {Dispatch} from "redux"
import {usersAPI} from "../api/users-api"
import {ResponseResultCodes} from "../types/api-types"

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowing: [] as Array<number>, // Array of users id
}

const searchReducer = (state = initialState, action: UserActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: findUserChanger(state, action.id, 'id', {followed: true})
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: findUserChanger(state, action.id, 'id', {followed: false})
            }
        case 'SET_USERS':
            // ...state.users,
            return {
                ...state,
                users: [...action.users],
            }
        case 'UPDATE_PAGE':
            return {
                ...state,
                currentPage: action.page
            }
        case 'SET_TOTAL_COUNT':
            return {
                ...state,
                totalUserCount: action.count
            }
        case 'SET_LOADING':
            return {
                ...state,
                isFetching: !state.isFetching
            }
        case 'TOGGLE_FOLLOWING':
            return {
                ...state,
                isFollowing: action.status
                    ? [...state.isFollowing, action.id]
                    : [...state.isFollowing.filter(e => e !== action.id)]
            }
        default:
            return state
    }
}
export default searchReducer

export const actions = {
    follow: (id: number) => ({type: 'FOLLOW', id} as const),
    unfollow: (id: number) => ({type: 'UNFOLLOW', id} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPage: (page: number) => ({type: 'UPDATE_PAGE', page} as const),
    setTotalCount: (count: number) => ({type: 'SET_TOTAL_COUNT', count} as const),
    setFetching: () => ({type: 'SET_LOADING'} as const),
    toggleFollowing: (id: number, status: boolean) => ({type: 'TOGGLE_FOLLOWING', id, status} as const),
}

export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkType =>
    async (dispatch, getState) => {
        dispatch(actions.setFetching())
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalCount(data.totalCount))
        dispatch(actions.setFetching())
    }

const _followUnfollowFlow = async (dispatch: DispatchType, apiMethod: any,
                                   actionCreator: (id: number) => UserActionsTypes, id: number) => {
    dispatch(actions.toggleFollowing(id, true))
    let data = await apiMethod(id)
    if (data.resultCode === ResponseResultCodes.Success) dispatch(actionCreator(id))
    dispatch(actions.toggleFollowing(id, false))
}

export const followUserThunkCreator = (id: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, usersAPI.followUser.bind(usersAPI), actions.follow, id)
}

export const unfollowUserThunkCreator = (id: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, usersAPI.unfollowUser.bind(usersAPI), actions.unfollow, id)
}

export type InitialStateType = typeof initialState
export type UserActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<UserActionsTypes>
type DispatchType = Dispatch<UserActionsTypes>
type GetStateType = () => StateType