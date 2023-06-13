/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useEffect, createContext } from 'react';
import {
    getAccessToken,
    getRefreshToken,
    login,
    setAccessToken,
    setRefreshToken,
    refreshAccessToken,
    removeAccessToken,
    removeRefreshToken,
    UserInfo,
    getUserInfo,
    setUserInfo,
    removeUserInfo
} from '../api/authApi';
import LoadingPage from '../pages/LoadingPage';

interface AuthContextType {
    accessToken: string | null;
    userInfo: UserInfo | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    userInfo: null,
    login: async () => {},
    logout: () => {},
    loading: false
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [accessToken, setAccessTokenState] = useState<string | null>(getAccessToken());
    const [userInfo, setUserInfoState] = useState<UserInfo | null>(getUserInfo());
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const storedAccessToken = getAccessToken();
        if (storedAccessToken) {
            setAccessTokenState(storedAccessToken);
        }
        if (!storedAccessToken && getRefreshToken()) {
            handleTokenRefresh();
        }

        if (!getUserInfo()) {
            handleLogout();
        }
    }, []);

    onstorage = () => {
        if (!getUserInfo()) {
            handleLogout();
        }
    };

    const handleLogin = async (email: string, password: string) => {
        try {
            setLoading(true);
            const res = await login(email, password);
            setAccessTokenState(res.accessToken);
            setAccessToken(res.accessToken);
            setRefreshToken(res.refreshToken);
            const user = { userId: res.userId, email: res.email, username: res.username, verified: res.verified };
            setUserInfoState(user);
            setUserInfo(user);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setAccessTokenState(null);
        removeAccessToken();
        removeRefreshToken();
        setUserInfoState(null);
        removeUserInfo();
    };

    const handleTokenRefresh = async () => {
        const storedRefreshToken = getRefreshToken();
        if (!storedRefreshToken) return;

        try {
            setLoading(true);
            const accessToken = await refreshAccessToken(storedRefreshToken);
            setAccessTokenState(accessToken);
            setAccessToken(accessToken);
        } catch (err) {
            console.log(err);
            handleLogout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleTokenRefresh();
        }, 15 * 60 * 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                userInfo,
                login: handleLogin,
                logout: handleLogout,
                loading
            }}>
            {loading ? <LoadingPage /> : children}
        </AuthContext.Provider>
    );
};
