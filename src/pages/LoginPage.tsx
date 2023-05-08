import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, IconButton, Paper, Stack, Link } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import '../style/AuthPages.scss';

const Visibility = VisibilityOutlinedIcon;
const VisibilityOff = VisibilityOffOutlinedIcon;

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [input, setInput] = useState({
        email: '',
        password: ''
    });
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(input);
        // TODO: send input to backend
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
        </div>
    );
};

export default LoginPage;
