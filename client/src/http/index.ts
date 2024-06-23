import axios from 'axios'

export const API_URL = 'http://localhost:5000'

export const $axios = axios.create({
    withCredentials: true,
    baseURL: `${API_URL}/api`,
})