import React from 'react';
import { CircularProgress } from '@mui/material';
import '../style/Loading.scss';

const Loading: React.FC<any> = () => {
    return (
        <div className='loading'>
            <CircularProgress data-color={(() => Math.floor(Math.random() * 3 + 1) as 1 | 2 | 3)()} className='circularProgress' />
        </div>
    );
};

export default Loading;
