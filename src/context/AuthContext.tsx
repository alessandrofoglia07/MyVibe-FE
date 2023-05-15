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

interface AuthContextType {
    accessToken: string | null;
    userInfo: UserInfo | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    userInfo: null,
    login: async () => {},
    logout: () => {}
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [accessToken, setAccessTokenState] = useState<string | null>(getAccessToken());
    const [userInfo, setUserInfoState] = useState<UserInfo | null>(getUserInfo());

    useEffect(() => {
        const storedAccessToken = getAccessToken();
        if (storedAccessToken) {
            setAccessTokenState(storedAccessToken);
        }
        (async () => {
            if (!storedAccessToken && getRefreshToken()) {
                await handleTokenRefresh();
            }
        })();
    }, []);

    const handleLogin = async (email: string, password: string) => {
        try {
            const res = await login(email, password);
            setAccessTokenState(res.accessToken);
            setAccessToken(res.accessToken);
            setRefreshToken(res.refreshToken);
            const user = { userId: res.userId, email: res.email };
            setUserInfoState(user);
            setUserInfo(user);
        } catch (err) {
            console.log(err);
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
            const accessToken = await refreshAccessToken(storedRefreshToken);
            setAccessTokenState(accessToken);
            setAccessToken(accessToken);
        } catch (err) {
            console.log(err);
            handleLogout();
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleTokenRefresh();
        }, 14 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                userInfo,
                login: handleLogin,
                logout: handleLogout
            }}>
            {children}
        </AuthContext.Provider>
    );
};
