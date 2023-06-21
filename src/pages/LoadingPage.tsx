import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import useTheme from '../hooks/useTheme';
import { Helmet } from 'react-helmet';

const LoadingPage: React.FC<any> = () => {
    const { themeColor } = useTheme();

    return (
        <div id='LoadingPage' className='page'>
            <Helmet>
                <meta name='theme-color' content={themeColor} />
                <meta name='description' content='Loading page' />
            </Helmet>
            <CircularProgress />
        </div>
    );
};

export default LoadingPage;
