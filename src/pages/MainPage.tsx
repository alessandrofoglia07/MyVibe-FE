/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../style/MainPage.scss';
import { Typography, Stack, Button, TextField, IconButton } from '@mui/material';
import useTheme from '../hooks/useTheme';

const MainPage = () => {
    const { toggleTheme } = useTheme();

    return (
        <div id='MainPage'>
            <h1>MainPage</h1>
        </div>
    );
};

export default MainPage;
