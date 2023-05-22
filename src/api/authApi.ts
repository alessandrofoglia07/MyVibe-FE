import axios from 'axios';
import Cookies from 'js-cookie';

const url = 'http://localhost:5000/api/auth';

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    userId: string;
    email: string;
    message: string;
}

export interface UserInfo {
    userId: string;
    email: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
    const res = await axios.post(`${url}/login`, { email, password });
    return res.data;
}

export async function refreshAccessToken(refreshToken: string): Promise<string> {
    const res = await axios.post(`${url}/refresh-token`, { refreshToken });
    return res.data.accessToken;
}

export function setUserInfo(userInfo: UserInfo) {
    localStorage.setItem('user_info', JSON.stringify(userInfo));
}

export function getUserInfo(): UserInfo | null {
    const userInfo = localStorage.getItem('user_info');
    return userInfo ? JSON.parse(userInfo) : null;
}

export function removeUserInfo() {
    localStorage.removeItem('user_info');
}

/**
 * @param minutes 
 * @returns date with minutes added
 */
const newDate = (minutes: number) => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + minutes);
    return date;
};

export function setAccessToken(accessToken: string) {
    Cookies.set('access_token', accessToken, { expires: newDate(15) });
}

export function getAccessToken(): string | null {
    return Cookies.get('access_token') || null;
}

export function removeAccessToken() {
    Cookies.remove('access_token');
}

export function setRefreshToken(refreshToken: string) {
    Cookies.set('refresh_token', refreshToken, { expires: 30 });
}

export function getRefreshToken(): string | null {
    return Cookies.get('refresh_token') || null;
}

export function removeRefreshToken() {
    Cookies.remove('refresh_token');
}
