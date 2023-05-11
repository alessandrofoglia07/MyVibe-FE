import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../style/AuthPages.scss';
import { Typography, TextField, Paper, Stack, Button } from '@mui/material';
import axios from 'axios';

const ResetPasswordPage = () => {
    const { id } = useParams<{ id: string }>();

    const [forgotPassword, setForgotPassword] = useState<boolean>();
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        (async () => {
            const res = await axios.get(`http://localhost:5000/auth/checkResetPassword/${id}`);
            setForgotPassword(res.data.forgotPassword);
        })();
    }, [id]);

    return (
        <div id='ResetPasswordPage' className='page authpage resetPage'>
            <Paper className='form'>
                <Typography variant='h4' className='title'>
                    Reset Password
                </Typography>
                {forgotPassword ? (
                    <form autoComplete='off'>
                        <TextField
                            id='password'
                            type='password'
                            placeholder='Password'
                            variant='outlined'
                            className='input'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </form>
                ) : (
                    <Typography variant='h6' className='message'>
                        This link is invalid or has expired.
                    </Typography>
                )}
            </Paper>
        </div>
    );
};

export default ResetPasswordPage;
