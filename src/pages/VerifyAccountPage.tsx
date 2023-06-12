import React, { useState, useEffect } from 'react';
import '../style/VerifyAccountPage.scss';
import axios from 'axios';
import useTheme from '../hooks/useTheme';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import NotFoundPage from './404Page';

const VerifyAccountPage: React.FC<any> = () => {
    useTheme();
    const { verificationCode } = useParams<string>();

    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [done, setDone] = useState<boolean>(false);

    useEffect(() => {
        if (done) return;
        (async () => {
            try {
                const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/completeVerification/${verificationCode}`);
                setMessage(res.data.message || 'Unknown error');
            } catch (err: any) {
                setError(err.response.data.message || 'Unknown error');
            }
        })();
        setDone(true);
    }, []);

    return (
        <div id='VerifyAccountPage'>
            {error.length > 0 ? (
                <NotFoundPage />
            ) : (
                <Typography variant='h1' className='message'>
                    {message.length > 0 ? message : 'Verifying account...'}
                </Typography>
            )}
        </div>
    );
};

export default VerifyAccountPage;
