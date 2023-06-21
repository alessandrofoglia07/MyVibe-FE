import React from 'react';
import '../style/404Page.scss';
import { Typography, Link, Stack } from '@mui/material';
import useTheme from '../hooks/useTheme';
import { Helmet } from 'react-helmet';

const NotFoundPage: React.FC<any> = () => {
    const { themeColor } = useTheme();

    return (
        <div id='NotFoundPage' className='page notFoundPage'>
            <Helmet>
                <title>404 - MyVibe.</title>
                <meta name='description' content='404 Page Not Found' />
                <meta name='theme-color' content={themeColor} />
            </Helmet>
            <Stack>
                <Typography variant='h1' className='title'>
                    Ups... this page does not <span>exist</span>!
                </Typography>
                <Typography variant='h1' className='title'>
                    Try{' '}
                    <Link aria-label='mainPageLink' href='/'>
                        here.
                    </Link>
                </Typography>
            </Stack>
        </div>
    );
};

export default NotFoundPage;
