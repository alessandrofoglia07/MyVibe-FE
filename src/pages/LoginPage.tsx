import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, IconButton, Paper, Stack, Link, Snackbar, Alert } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import '../style/AuthPages.scss';
import axios from 'axios';
import { useSignIn, useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

const Visibility = VisibilityOutlinedIcon;
const VisibilityOff = VisibilityOffOutlinedIcon;

const LoginPage = () => {
    useTheme();
    const auth = useAuthUser();
    const signIn = useSignIn();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [input, setInput] = useState({
        email: '',
        password: ''
    });
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [open, setOpen] = useState<{ bool: boolean; message: string }>({ bool: false, message: '' });
    const [errorCount, setErrorCount] = useState(0);

    useEffect(() => {
        if (auth()) {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if (emailFocus) {
            const redBall = document.getElementsByClassName('ball-red1')[0];

            redBall.classList.add('ball-red-focus');

            const emailInput = document.getElementById('email') as HTMLInputElement;

            emailInput.addEventListener('focusout', () => {
                redBall.classList.remove('ball-red-focus');
                redBall.classList.add('ball-red-outFocus');

                setTimeout(() => {
                    redBall.classList.remove('ball-red-outFocus');
                }, 1000);
                setEmailFocus(false);
            });
        }
    }, [emailFocus]);

    useEffect(() => {
        if (passwordFocus) {
            const purpleBall = document.getElementsByClassName('ball-purple1')[0];
            const blueBall = document.getElementsByClassName('ball-blue1')[0];
            purpleBall.classList.add('ball-purple-focus');
            setTimeout(() => {
                blueBall.classList.add('ball-blue-focus');
            }, 200);

            const passwordInput = document.getElementById('password') as HTMLInputElement;

            passwordInput.addEventListener('focusout', () => {
                purpleBall.classList.remove('ball-purple-focus');
                purpleBall.classList.add('ball-purple-outFocus');
                setTimeout(() => {
                    blueBall.classList.remove('ball-blue-focus');
                    blueBall.classList.add('ball-blue-outFocus');
                }, 500);
                setTimeout(() => {
                    purpleBall.classList.remove('ball-purple-outFocus');
                    blueBall.classList.remove('ball-blue-outFocus');
                }, 1000);
                setPasswordFocus(false);
            });
        }
    }, [passwordFocus]);

    const handleChange = (id: number, value: string) => {
        switch (id) {
            case 1: // email
                setInput({ ...input, email: value });
                break;
            case 2: // password
                setInput({ ...input, password: value });
                break;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await axios.post('http://localhost:5000/auth/login', input);

        switch (res.data.message) {
            case 'Email and password required' || 'Invalid email or password' || 'Internal server error':
                setOpen({ bool: true, message: res.data.message });
                setErrorCount(errorCount + 1);
                break;
            case 'Login successful': {
                const { accessToken, refreshToken, userId, email } = res.data;
                signIn({ token: accessToken, refreshToken: refreshToken, tokenType: 'Bearer', expiresIn: 15, refreshTokenExpireIn: 43200, authState: { id: userId, email: email } });
                navigate('/');
                break;
            }
            default:
                setOpen({ bool: true, message: 'Something went wrong...' });
                break;
        }
    };

    return (
        <div id='LoginPage' className='page loginPage authpage'>
            <div id='bg'>
                <div className='ball ball-purple1' />
                <div className='ball ball-red1' />
                <div className='ball ball-blue1' />
            </div>

            <Paper className='form'>
                <Typography variant='h4' className='title'>
                    Log In Here.
                </Typography>
                <form autoComplete='off' onSubmit={handleSubmit}>
                    <Stack display='flex' alignItems='center'>
                        <div className='inputContainer' style={{ marginTop: '80px' }}>
                            <Typography variant='h5' className='subtitle'>
                                Email
                            </Typography>
                            <TextField
                                autoFocus
                                id='email'
                                type='email'
                                value={input.email}
                                onChange={(e) => {
                                    handleChange(1, e.target.value);
                                }}
                                placeholder='Email'
                                variant='outlined'
                                className='input'
                                onFocus={() => {
                                    setEmailFocus(true);
                                }}
                            />
                        </div>
                        <div className='inputContainer'>
                            <Typography variant='h5' className='subtitle'>
                                Password
                            </Typography>
                            <TextField
                                id='password'
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                variant='outlined'
                                className='input'
                                value={input.password}
                                onChange={(e) => {
                                    handleChange(2, e.target.value);
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            onClick={() => {
                                                setShowPassword(!showPassword);
                                            }}>
                                            {input.password === '' ? null : showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    )
                                }}
                                onFocus={() => {
                                    setPasswordFocus(true);
                                }}
                            />
                            {errorCount > 0 ? (
                                <Link className='errorText' href='/password-forgotten'>
                                    Did you forget your password?
                                </Link>
                            ) : null}
                        </div>
                        <Button disableRipple variant='contained' className='submitBtn' type='submit'>
                            Log in
                        </Button>
                        <Typography variant='h6' className='link'>
                            Don't have an account yet? <Link href='/sign-up'>Sign up.</Link>
                        </Typography>
                    </Stack>
                </form>
            </Paper>
            <Snackbar open={open.bool} autoHideDuration={6000} onClose={() => setOpen({ bool: false, message: '' })}>
                <Alert onClose={() => setOpen({ bool: false, message: '' })} severity='error' sx={{ width: '100%' }}>
                    {open.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default LoginPage;
