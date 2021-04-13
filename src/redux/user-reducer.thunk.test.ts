import {actions, followUserThunkCreator, unfollowUserThunkCreator} from "./search-reducer";
import {usersAPI} from "../api/users-api";
import {ResponseResultCodes, RespT} from "../types/api-types";

// мокаем наш запрос и теперь он фейковый
jest.mock('../api/users-api')
//здесь не настоящий объект
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: RespT = {
    data: {},
    resultCode: ResponseResultCodes.Success,
    messages: []
}
let dispatchMock = jest.fn()
let getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
})

test('follow thunk should be success', async () => {


    const thunk = followUserThunkCreator(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowing(1, true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.follow(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowing(1, false))
})

test('unfollow thunk should be success', async () => {
    usersAPIMock.unfollowUser.mockResolvedValue(result)


    const thunk = unfollowUserThunkCreator(3)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowing(3, true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollow(3))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowing(3, false))
})