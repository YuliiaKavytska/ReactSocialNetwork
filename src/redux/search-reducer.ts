import {findUserChanger} from "../components/utils/object-helpers"
import {UserType} from "../types/types"
import {BaseThunkType, InferActionsTypes, StateType} from "./redux-store"
import {Dispatch} from "redux"
import {usersAPI} from "../api/users-api"
import {ResponseResultCodes, RespT} from "../types/api-types"

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowing: [] as Array<number>, // Array of users id
    filter: {
        term: '',
        friend: null as boolean | null
    }
}

const searchReducer = (state = initialState, action: UserActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/SEARCH/FOLLOW':
            return {
                ...state,
                users: findUserChanger(state, action.id, 'id', {followed: true})
            }
        case 'SN/SEARCH/UNFOLLOW':
            return {
                ...state,
                users: findUserChanger(state, action.id, 'id', {followed: false})
            }
        case 'SN/SEARCH/SET_USERS':
            return {
                ...state,
                users: [...action.users],
            }
        case 'SN/SEARCH/UPDATE_PAGE':
            return {
                ...state,
                currentPage: action.page
            }
        case 'SN/SEARCH/SET_TOTAL_COUNT':
            return {
                ...state,
                totalUserCount: action.count
            }
        case 'SN/SEARCH/SET_LOADING':
            return {
                ...state,
                isFetching: !state.isFetching
            }
        case 'SN/SEARCH/TOGGLE_FOLLOWING':
            return {
                ...state,
                isFollowing: action.status
                    ? [...state.isFollowing, action.id]
                    : [...state.isFollowing.filter(e => e !== action.id)]
            }
        case "SN/SEARCH/SET_FILTER":
            return {
                ...state,
                filter: {
                    ...state.filter,
                    ...action.payload
                }
            }
        default:
            return state
    }
}
export default searchReducer

export const actions = {
    follow: (id: number) => ({type: 'SN/SEARCH/FOLLOW', id} as const),
    unfollow: (id: number) => ({type: 'SN/SEARCH/UNFOLLOW', id} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SN/SEARCH/SET_USERS', users} as const),
    setCurrentPage: (page: number) => ({type: 'SN/SEARCH/UPDATE_PAGE', page} as const),
    setTotalCount: (count: number) => ({type: 'SN/SEARCH/SET_TOTAL_COUNT', count} as const),
    setFetching: () => ({type: 'SN/SEARCH/SET_LOADING'} as const),
    toggleFollowing: (id: number, status: boolean) => ({type: 'SN/SEARCH/TOGGLE_FOLLOWING', id, status} as const),
    setFilter: (filter: FilterType) => ({type: 'SN/SEARCH/SET_FILTER', payload: {filter}} as const)
}

export const getUsersThunkCreator = (currentPage: number, pageSize: number, term: string, friend: boolean | null): ThunkType =>
    async (dispatch, getState) => {
        dispatch(actions.setFetching())
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(actions.setFilter({term, friend}))

        let data = await usersAPI.getUsers(currentPage, pageSize, term, friend)
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalCount(data.totalCount))
        dispatch(actions.setFetching())
    }

const _followUnfollowFlow = async (dispatch: DispatchType, apiMethod: (userId: number) => Promise<RespT>,
                                   actionCreator: (id: number) => UserActionsTypes, id: number) => {
    dispatch(actions.toggleFollowing(id, true))
    let data = await apiMethod(id)
    if (data.resultCode == ResponseResultCodes.Success) {
        dispatch(actionCreator(id))
    }
    dispatch(actions.toggleFollowing(id, false))
}

export const followUserThunkCreator = (id: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, usersAPI.followUser.bind(usersAPI), actions.follow, id)
}

export const unfollowUserThunkCreator = (id: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, usersAPI.unfollowUser.bind(usersAPI), actions.unfollow, id)
}

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
export type UserActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<UserActionsTypes>
type DispatchType = Dispatch<UserActionsTypes>
type GetStateType = () => StateType