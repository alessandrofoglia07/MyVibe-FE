import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/AuthPages.scss';
import { Typography, TextField, Paper, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import useTheme from '../hooks/useTheme';

const ResetPasswordPage: React.FC<any> = () => {
    useTheme();

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [forgotPassword, setForgotPassword] = useState<boolean>();
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordCopy, setNewPasswordCopy] = useState('');
    const [newPasswordError, setNewPasswordError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`http://localhost:5000/auth/checkResetPassword/${id}`);
                setForgotPassword(res.data.forgotPassword);
            } catch (err: any) {
                throw new Error(err);
            }
        })();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (newPassword !== newPasswordCopy) {
                setNewPasswordError(true);
                throw new Error('Passwords do not match');
            } else {
                const res = await axios.post('http://localhost:5000/auth/changePassword', { id, newPassword });

                if (res.data.message === 'All fields required' || res.data.message === 'Invalid user') {
                    setNewPasswordError(true);
                    throw new Error(res.data.message);
                } else {
                    navigate('/login');
                }
            }
        } catch (err: any) {
            throw new Error(err);
        }
    };

    return (
        <div id='ResetPasswordPage' className='page authpage resetPage'>
            <Paper className='form' sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h4' className='title'>
                    Reset Password
                </Typography>
                {forgotPassword ? (
                    <form
                        autoComplete='off'
                        onSubmit={handleSubmit}
                        style={{ height: '100%', width: '80%', marginTop: '100px', alignSelf: 'center', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='h6' className='subtitle'>
                            Enter your new password
                        </Typography>
                        <TextField
                            id='password'
                            type='password'
                            placeholder='New password'
                            variant='outlined'
                            className='input'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <Typography variant='h6' className='subtitle'>
                            Repeat your new password
                        </Typography>
                        <TextField
                            id='password-copy'
                            type='password'
                            placeholder='New password'
                            variant='outlined'
                            className='input'
                            value={newPasswordCopy}
                            onChange={(e) => setNewPasswordCopy(e.target.value)}
                        />
                        <Button variant='contained' type='submit' className='submitBtn' sx={{ mt: '20px', alignSelf: 'center' }}>
                            Confirm
                        </Button>
                    </form>
                ) : (
                    <Typography variant='h6' className='message'>
                        This link is invalid or has expired.
                    </Typography>
                )}
            </Paper>
            <Snackbar open={newPasswordError} autoHideDuration={6000} onClose={() => setNewPasswordError(false)}>
                <Alert onClose={() => setNewPasswordError(false)} severity='error' sx={{ width: '100%' }}>
                    Passwords do not match or are empty.
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ResetPasswordPage;
