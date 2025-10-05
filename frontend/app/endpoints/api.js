import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/';
const LOGIN_URL = `${BASE_URL}auth/token`;
const REGISTER_URL = `${BASE_URL}auth/register/`;
const LOGOUT_URL = `${BASE_URL}auth/logout/`;
const AUTHENTICATED_URL = `${BASE_URL}auth/login`;
const REFRESH_URL = `${BASE_URL}auth/token/refresh`;
const JOKES_URL = `${BASE_URL}api/jokes`;


export const login = async (username, password) => {
    const response = await axios.post(LOGIN_URL,
        {username: username, password: password},
        {withCredentials: true}
    )
    return response.data.success;
}

export const refresh_token = async () => {
    try {
        const response = await axios.post(REFRESH_URL,
            {},
            {withCredentials: true})
        return true
    } catch (error) {
        return false;
    }
}

export const get_jokes = async () => {
    try {
        const response = await axios.get(JOKES_URL,
            {withCredentials: true})
        return response.data;
    } catch (error) {
        return call_refresh(error, JOKES_URL, {withCredentials: true})
    }
}

export const logout = async () => {
    const response = await axios.post(LOGOUT_URL, {}, {withCredentials: true});
    return response.data;
}

const call_refresh = async (error, func) => {
    if(error.response && error.response.status === 401) {
        const tokenRefreshed = await refresh_token();

        if(tokenRefreshed) {
            const retryResponse = await func();
            return retryResponse.data;
        }
        return false
    }
}

export const register = async (username, email, password) => {
    const response = await axios.post(REGISTER_URL, {username, email, password},
        {withCredentials: true});
    return response.data;
}

export const authenticated_user = async () => {
    const response = await axios.get(AUTHENTICATED_URL,
        {withCredentials: true});
    return response.data;
}

