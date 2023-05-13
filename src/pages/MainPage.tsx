/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../style/MainPage.scss';
import { Typography, Stack, Button, TextField, IconButton } from '@mui/material';
import useTheme from '../hooks/useTheme';
import Navbar from '../components/navbar';

const MainPage = () => {
    const { toggleTheme } = useTheme();

    return (
        <div id='MainPage'>
            <div id='top'>
                <Navbar />
            </div>
            <div id='left'></div>
            <div id='center'></div>
            <div id='right'></div>
        </div>
    );
};

export default MainPage;
