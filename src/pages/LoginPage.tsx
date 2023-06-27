import React, { useState, useEffect, useContext } from 'react';
import { Typography, TextField, Button, IconButton, Paper, Stack, Link, Snackbar, Alert } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import '../style/AuthPages.scss';
import { useNavigate } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import { AuthContext } from '../context/AuthContext';
import { Helmet } from 'react-helmet';
import ErrorAlert from '../components/Error';

const Visibility = VisibilityOutlinedIcon;
const VisibilityOff = VisibilityOffOutlinedIcon;

const LoginPage: React.FC<any> = () => {
    const { themeColor } = useTheme();
    const navigate = useNavigate();
    const { login, accessToken } = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);
    const [input, setInput] = useState({
        email: '',
        password: ''
    });
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [error, setError] = useState<string>('');
    const [errorBackup, setErrorBackup] = useState<string>('');

    useEffect(() => {
        if (accessToken) navigate('/');
    }, [accessToken]);

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

        try {
            await login(input.email, input.password);
            navigate('/');
        } catch (err: any) {
            setError('Invalid username or password');
            setErrorBackup('Invalid username or password');
            throw new Error(err);
        }
    };

    return (
        <div id='LoginPage' className='page loginPage authpage'>
            <Helmet>
                <title>Log In - MyVibe.</title>
                <meta name='theme-color' content={themeColor} />
                <meta name='description' content='Log in to MyVibe.' />
            </Helmet>

            <div id='bg'>
                <div className='ball unselectable ball-purple1' />
                <div className='ball unselectable ball-red1' />
                <div className='ball unselectable ball-blue1' />
            </div>

            <Paper className='form'>
                <Typography variant='h4' className='title unselectable'>
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
                            {errorBackup && (
                                <Link className='errorText' href='/password-forgotten'>
                                    Did you forget your password?
                                </Link>
                            )}
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
            {error && <ErrorAlert message={error} close={() => setError('')} />}
        </div>
    );
};

export default LoginPage;
