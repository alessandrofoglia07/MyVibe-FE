import React from 'react';
import '../style/404Page.scss';
import { Typography, Link, Stack } from '@mui/material';
import useTheme from '../hooks/useTheme';

const NotFoundPage: React.FC<any> = () => {
    useTheme();

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
