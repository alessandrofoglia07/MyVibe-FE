import React, { useState } from 'react';
import '../style/VerifyAccountPage.scss';
import axios from 'axios';
import useTheme from '../hooks/useTheme';
import { Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import ErrorAlert from '../components/Error';

const Done = DoneRoundedIcon;

const VerifyAccountPage: React.FC<any> = () => {
    const { themeColor } = useTheme();
    const { verificationCode } = useParams<string>();

    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [done, setDone] = useState<boolean>(false);

    const verifyAccount = async () => {
        if (done) return;
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/completeVerification/${verificationCode}`);
            setMessage(res.data.message || 'Unknown error');
            setDone(true);
        } catch (err: any) {
            setError(err.response.data.message || 'Unknown error');
            throw new Error(err);
        }
    };

    return (
        <div id='VerifyAccountPage'>
            <Helmet>
                <title>Verify account - MyVibe.</title>
                <meta name='description' content='Verify account page.' />
                <meta name='theme-color' content={themeColor} />
            </Helmet>
            {done ? (
                <>
                    <Done className='doneIcon' />
                    <Typography variant='h1' className='message'>
                        {message}
                    </Typography>
                </>
            ) : (
                <>
                    <Typography variant='h1' className='message'>
                        Verify your account.
                    </Typography>
                    <Button disableRipple variant='contained' className='startBtn' onClick={verifyAccount}>
                        Verify
                    </Button>
                </>
            )}
            {error && <ErrorAlert message={error} close={() => setError('')} />}
        </div>
    );
};

export default VerifyAccountPage;
