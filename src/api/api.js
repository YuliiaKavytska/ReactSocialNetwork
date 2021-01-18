import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        "API-KEY": 'd57788c2-5d19-4b3b-bd5f-a487d6ffd174'
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get(`/users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },
    followUser(id) {
        return instance.post(`/follow/` + id).then(response => response.data);
    },
    unfollowUser(id) {
        return instance.delete(`/follow/` + id).then(response => response.data);
    }
};

export const profileAPI = {
    getUserProfile(userId) {
        return instance.get(`/profile/${userId}`).then(response => response.data);
    }
};

export const AuthAPI = {
    authMe() {
        return instance.get(`/auth/me`).then(response => response.data);
    },
}