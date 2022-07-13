import axios from "axios";

// Конфигурация хоста

export const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

