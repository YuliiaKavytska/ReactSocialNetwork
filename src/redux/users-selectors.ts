import {UserType} from "../types/types"
import {StateType} from "./redux-store";

export const getUsers = (state: StateType) => {
    return state.searchPage.users
}
export const getPageSize = (state: StateType) => {
    return state.searchPage.pageSize
}
export const getTotalUserCount = (state: StateType) => {
    return state.searchPage.totalUserCount
}
export const getCurrentPage = (state: StateType) => {
    return state.searchPage.currentPage
}
export const getIsFetching = (state: StateType) => {
    return state.searchPage.isFetching
}
export const getIsFollowing = (state: StateType) => {
    return state.searchPage.isFollowing
}
