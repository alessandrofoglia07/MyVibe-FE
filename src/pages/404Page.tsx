import React from 'react';
import '../styles/404Page.css';
import { Typography, Link, Stack } from '@mui/material';

const NotFoundPage = () => {
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
