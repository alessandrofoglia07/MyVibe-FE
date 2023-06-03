import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import useTheme from '../hooks/useTheme';

const LoadingPage: React.FC<any> = () => {
    useTheme();

    return (
        <div id='LoadingPage' className='page'>
            <CircularProgress />
        </div>
    );
};

export default LoadingPage;
