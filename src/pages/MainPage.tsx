/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import '../style/MainPage.scss';
import { Typography, Stack, Button, TextField, IconButton } from '@mui/material';
import useTheme from '../hooks/useTheme';
import Navbar from '../components/navbar';
import { AuthContext } from '../context/AuthContext';

const MainPage = () => {
    const { toggleThemeTo, toggleTheme } = useTheme();
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        });
    }, []);

    const { userInfo } = useContext(AuthContext);

    useEffect(() => {
        toggleThemeTo('light');
    }, []);

    return (
        <div id='MainPage' className='page' style={{ display: 'inline' }}>
            <div id='top'>
                <Navbar />
            </div>
            <div id='bottom' className='bottom'>
                {width > 768 && <div id='left' className='left'></div>}
                <div id='center' className='center'>
                    <Button
                        variant='contained'
                        onClick={() => {
                            toggleTheme();
                        }}>
                        Change theme
                    </Button>
                </div>
                {width > 768 && <div id='right' className='right'></div>}
            </div>
        </div>
    );
};

export default MainPage;
