/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import '../style/MainPage.scss';
import { Typography, Stack, Button, TextField, IconButton } from '@mui/material';
import useTheme from '../hooks/useTheme';
import Navbar from '../components/navbar';
import { AuthContext } from '../context/AuthContext';

const MainPage = () => {
    const { toggleTheme } = useTheme();

    const { userInfo } = useContext(AuthContext);

    return (
        <div id='MainPage'>
            <div id='top'>
                <Navbar />
            </div>
            <div id='left'></div>
            <div id='center'>{userInfo?.email}</div>
            <div id='right'></div>
        </div>
    );
};

export default MainPage;
