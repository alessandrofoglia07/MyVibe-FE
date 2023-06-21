import React, { useState } from 'react';
import '../style/AuthPages.scss';
import { Typography, TextField, Button, Paper, Stack } from '@mui/material';
import axios from 'axios';
import useTheme from '../hooks/useTheme';
import { Helmet } from 'react-helmet';

const PasswordForgottenPage: React.FC<any> = () => {
    const { themeColor } = useTheme();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSendEmail = async (e: React.FormEvent<any>) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/auth/forgotPassword', { email });

            switch (res.data.message) {
                case 'Email sent':
                    setMessage("We've sent you an email with a link to reset your password.");
                    break;
                case 'Email not found':
                    setMessage('No email was found. Try to sign up.');
                    break;
                default:
                    setMessage('Something went wrong...');
                    break;
            }
        } catch (err: any) {
            throw new Error(err);
        }
    };

    return (
        <div id='PassForgottenPage' className='page authpage passForgottenPage'>
            <Helmet>
                <title>Forgot Password - MyVibe.</title>
                <meta name='theme-color' content={themeColor} />
                <meta name='description' content='Forgot your password? No worries, we got you.' />
            </Helmet>
            <Paper className='form' sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h4' className='title'>
                    Password Reset
                </Typography>
                <form autoComplete='off' onSubmit={handleSendEmail}>
                    <Stack display='flex' alignItems='center' height='100%'>
                        <div className='inputContainer' style={{ marginTop: '80px' }}>
                            <Typography variant='h5' className='subtitle'>
                                Email
                            </Typography>
                            <TextField
                                autoFocus
                                id='email'
                                type='email'
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                placeholder='Email'
                                variant='outlined'
                                className='input'
                            />
                        </div>
                        <Button variant='contained' className='submitBtn' type='submit'>
                            Send Reset Email
                        </Button>
                    </Stack>
                </form>
                {message ? (
                    <Typography variant='h6' className='message'>
                        {message}
                    </Typography>
                ) : null}
            </Paper>
        </div>
    );
};

export default PasswordForgottenPage;
