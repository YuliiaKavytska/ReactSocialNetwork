import searchReducer, {actions, InitialStateType} from "./search-reducer"

let state: InitialStateType

beforeEach(() => {
    state = {
        users: [
            {
                id: 0,
                name: 'Yuliia 0',
                followed: false,
                photos: {
                    small: null,
                    large: null
                },
                status: 'Hello 0'
            },
            {
                id: 1,
                name: 'Yuliia 1',
                followed: false,
                photos: {
                    small: null,
                    large: null
                },
                status: 'Hello 1'
            },
            {
                id: 2,
                name: 'Yuliia 2',
                followed: false,
                photos: {
                    small: null,
                    large: null
                },
                status: 'Hello 2'
            },
            {
                id: 3,
                name: 'Yuliia 3',
                followed: true,
                photos: {
                    small: null,
                    large: null
                },
                status: 'Hello 3'
            },
        ],
        pageSize: 5,
        totalUserCount: 0,
        currentPage: 1,
        isFetching: false,
        isFollowing: []
    }
})

test("follow success", () => {
    // search reducer
    const newState = searchReducer(state, actions.follow(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {
    const newState = searchReducer(state, actions.unfollow(3))

    expect(newState.users[2].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeFalsy()
})