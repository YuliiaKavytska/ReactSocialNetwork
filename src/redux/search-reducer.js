const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const UPDATE_PAGE = 'UPDATE-PAGE'
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT';
const SET_LOADING = 'SET_LOADING';

const initialState = {
    users: [ ],
    pageSize: 5,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: true,
};

const searchReducer =(state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.id ? ({...u, followed:  true}) : u),
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u =>  u.id === action.id ? ({...u, followed: false}) : u),
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
        default:
            return state;
    }
}

export const follow = (id) => ({type: FOLLOW, id});
export const unfollow = (id) => ({type: UNFOLLOW, id});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (page) => ({type: UPDATE_PAGE, page});
export const setTotalCount = (count) => ({type: SET_TOTAL_COUNT, count});
export const setFetching = () => ({type: SET_LOADING})

export default searchReducer;
