import {usersAPI} from "../api/api";
import {findUserChanger} from "../components/utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const UPDATE_PAGE = 'UPDATE-PAGE'
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT';
const SET_LOADING = 'SET_LOADING';
const TOGGLE_FOLLOWING = 'TOGGLE_FOLLOWING';

const initialState = {
    users: [],
    pageSize: 5,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowing: [],
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: findUserChanger(state, action.id, 'id', {followed: true})
            };
        case UNFOLLOW:
            return {
                ...state,
                users: findUserChanger(state, action.id, 'id', {followed: false})
            };
        case SET_USERS:
            // ...state.users,
            return {
                ...state,
                users: [...action.users],
            };
        case UPDATE_PAGE:
            return {
                ...state,
                currentPage: action.page
            };
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalUserCount: action.count
            }
        case SET_LOADING:
            return {
                ...state,
                isFetching: !state.isFetching
            }
        case TOGGLE_FOLLOWING:
            return {
                ...state,
                isFollowing: action.status
                    ? [...state.isFollowing, action.id]
                    : [state.isFollowing.filter(e => e !== action.id)]
            }
        default:
            return state;
    }
}
export default searchReducer;

export const follow = (id) => ({type: FOLLOW, id});
export const unfollow = (id) => ({type: UNFOLLOW, id});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (page) => ({type: UPDATE_PAGE, page});
export const setTotalCount = (count) => ({type: SET_TOTAL_COUNT, count});
export const setFetching = () => ({type: SET_LOADING});
export const toggleFollowing = (id, status) => ({type: TOGGLE_FOLLOWING, id, status});

export const getUsersThunkCreator = (currentPage, pageSize) => async (dispatch) => {
    dispatch(setFetching());
    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setUsers(data.items));
    dispatch(setTotalCount(data.totalCount));
    dispatch(setFetching());
};

const followUnfollowFlow = async (dispatch, apiMethod, actionCreator, id) => {
    dispatch(toggleFollowing(id, true));
    let data = await apiMethod(id);
    if (data.resultCode === 0) dispatch(actionCreator(id));
    dispatch(toggleFollowing(id, false));
}

export const followUserThunkCreator = (id) => async (dispatch) => {
    followUnfollowFlow(dispatch, usersAPI.followUser.bind(usersAPI), follow, id);
}

export const unfollowUserThunkCreator = (id) => async (dispatch) => {
    followUnfollowFlow(dispatch, usersAPI.unfollowUser.bind(usersAPI), unfollow, id);
}