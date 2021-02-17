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
    },
    getStatus(userId) {
        return instance.get('/profile/status/' + userId);
    },
    updateStatus(status) {
        return instance.put('/profile/status', {status}).then(response => response.data);
    },
    setNewPhoto(image) {
        const formData = new FormData();
        formData.append('image', image);
        return instance.put('/profile/photo', formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then(response => response.data);
    },
    updateProfile(profileData) {
        return instance.put('/profile', profileData).then(response => response.data);
    }
};

export const AuthAPI = {
    authMe() {
        return instance.get(`/auth/me`).then(response => response.data);
    },
    login(email, password, remember = false, captcha = null) {
        return instance.post(`/auth/login`, {email, password, rememberMe: remember, captcha})
            .then(response => response.data);
    },
    logout() {
        return instance.delete(`/auth/login`).then(response => response.data);
    }
}

export const securityAPI = {
    getCaptcha() {
        return instance.get('/security/get-captcha-url').then(response => response.data);
    }
}