import {instance} from "./api"
import {UserType} from "../types/types"
import { RespT } from "../types/api-types"

export type UsersAPIType = {
    items: Array<UserType>
    totalCount: number
    error: null | string
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get<UsersAPIType>(`/users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    },
    followUser(id: number) {
        return instance.post<RespT>(`/follow/` + id).then(res => res.data)
    },
    unfollowUser(id: number) {
        return instance.delete<RespT>(`/follow/` + id).then(res => res.data)
    }
}