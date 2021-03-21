import axios from "axios"

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: { "API-KEY": 'd57788c2-5d19-4b3b-bd5f-a487d6ffd174' }
})