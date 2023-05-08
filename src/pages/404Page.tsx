import React, { useEffect } from 'react';
import '../scss/404Page.scss';
import { Typography, Link, Stack } from '@mui/material';

const NotFoundPage = () => {
    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    });

    return (
        <div id='NotFoundPage' className='page notFoundPage'>
            <Stack>
                <Typography variant='h1' className='title'>
                    Ups... this page does not <span>exist</span>!
                </Typography>
                <Typography variant='h1' className='title'>
                    Try <Link href='/'>here.</Link>
                </Typography>
            </Stack>
        </div>
    );
};

export default NotFoundPage;
