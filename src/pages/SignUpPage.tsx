import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Typography, TextField, Button, IconButton, Paper, Stack, Link, Snackbar, Alert } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import '../style/AuthPages.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

const Visibility = VisibilityOutlinedIcon;
const VisibilityOff = VisibilityOffOutlinedIcon;

const SignUpPage = () => {
    useTheme();
    const navigate = useNavigate();
    const { accessToken } = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [verificationCode, setVerificationCode] = useState<string[]>(['', '', '', '', '', '']);
    const [usernameFocus, setUsernameFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [signedUp, setSignedUp] = useState(false);
    const [open, setOpen] = useState<{ bool: boolean; message: string }>({ bool: false, message: '' });

    useEffect(() => {
        if (accessToken) navigate('/');
    });

    useEffect(() => {
        if (usernameFocus) {
            const redBall = document.getElementsByClassName('ball-red')[0];
            redBall.classList.add('ball-red-focus');

            const usernameInput = document.getElementById('username') as HTMLInputElement;

            usernameInput.addEventListener('focusout', () => {
                redBall.classList.remove('ball-red-focus');
                redBall.classList.add('ball-red-outFocus');
                setTimeout(() => {
                    redBall.classList.remove('ball-red-outFocus');
                }, 1000);
                setUsernameFocus(false);
            });
        }
    }, [usernameFocus]);

    useEffect(() => {
        if (emailFocus) {
            const blueBall = document.getElementsByClassName('ball-blue')[0];
            blueBall.classList.add('ball-blue-focus');

            const emailInput = document.getElementById('email') as HTMLInputElement;

            emailInput.addEventListener('focusout', () => {
                blueBall.classList.remove('ball-blue-focus');
                blueBall.classList.add('ball-blue-outFocus');
                setTimeout(() => {
                    blueBall.classList.remove('ball-blue-outFocus');
                }, 1000);
                setEmailFocus(false);
            });
        }
    }, [emailFocus]);

    useEffect(() => {
        if (passwordFocus) {
            const purpleBall = document.getElementsByClassName('ball-purple')[0];
            purpleBall.classList.add('ball-purple-focus');

            const passwordInput = document.getElementById('password') as HTMLInputElement;

            passwordInput.addEventListener('focusout', () => {
                purpleBall.classList.remove('ball-purple-focus');
                purpleBall.classList.add('ball-purple-outFocus');
                setTimeout(() => {
                    purpleBall.classList.remove('ball-purple-outFocus');
                }, 1000);
                setPasswordFocus(false);
            });
        }
    }, [passwordFocus]);

    const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id;
        const value = e.target.value;

        if (value.length === 1 && /[0-9]/.test(value)) {
            setVerificationCode((init) => {
                const newVerificationCode = [...init];
                newVerificationCode[parseInt(id)] = value;

                const nextSibling = document.getElementById((parseInt(id) + 1).toString()) as HTMLInputElement | null;
                if (nextSibling) {
                    nextSibling.focus();
                }

                return newVerificationCode;
            });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            const id = e.currentTarget.id;
            const prevSibling = document.getElementById((parseInt(id) - 1).toString()) as HTMLInputElement | null;

            setVerificationCode((init) => {
                const newVerificationCode = [...init];
                newVerificationCode[parseInt(id)] = '';

                if (prevSibling) {
                    prevSibling.focus();
                }

                return newVerificationCode;
            });
        }
    };

    const handleChange = (id: number, value: string) => {
        switch (id) {
            case 0: // username
                setInput({ ...input, username: value });
                break;
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

        const res = await axios.post('http://localhost:5000/auth/send-code', input);

        switch (res.data.message) {
            case 'Email already registered':
            case 'Username already taken':
            case 'Internal server error':
            case 'All fields required':
            case 'Password must be 6-16 characters long, and contain at least a letter and a number':
                setOpen({ bool: true, message: res.data.message });
                break;
            case 'Verification code sent':
                setVerifying(true);
                break;
            default:
                setOpen({ bool: true, message: 'Something went wrong...' });
                break;
        }
    };

    const handleVerificationCodeSubmit = async () => {
        if (!verificationCode.every((digit) => digit !== '')) return;
        const code = verificationCode.join('');
        const res = await axios.post('http://localhost:5000/auth/verify-code', { ...input, code });

        switch (res.data?.message) {
            case 'Internal server error':
            case 'Invalid verification code':
                setOpen({ bool: true, message: res.data.message });
                break;
            case 'User created':
                setVerifying(false);
                setSignedUp(true);
                setInput({ username: '', email: '', password: '' });
                break;
            default:
                setOpen({ bool: true, message: 'Something went wrong...' });
                break;
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        if (verificationCode.every((digit) => digit !== '')) return;
        const pastedData = e.clipboardData.getData('text');

        if (pastedData.match(/^[0-9]{6}$/)) {
            setVerificationCode(pastedData.split(''));
            const input = document.getElementById('5') as HTMLInputElement;
            input.focus();
        }
    };

    return (
        <div id='SignUpPage' className='page signupPage authpage'>
            <div id='bg'>
                <div className='ball ball-blue' />
                <div className='ball ball-red' />
                <div className='ball ball-purple' />
            </div>

            <Paper className='form'>
                {verifying ? (
                    <div className='verifying'>
                        <Typography variant='h3' className='myVibe'>
                            myvibe.
                        </Typography>
                        <Typography variant='h4' className='title'>
                            Verification Code
                        </Typography>
                        <Typography variant='h5' className='subtitle' sx={{ textAlign: 'center' }}>
                            Please check your email for the verification code.
                        </Typography>
                        <Stack className='verificationCodeContainer'>
                            {verificationCode.map((digit, idx) => (
                                <input
                                    key={idx}
                                    id={idx.toString()}
                                    value={digit}
                                    onKeyDown={handleKeyDown}
                                    onChange={handleVerificationCodeChange}
                                    onPaste={handlePaste}
                                    type='number'
                                    className='verificationCodeDigit'
                                />
                            ))}
                        </Stack>
                        <Button variant='contained' className='submitBtn' onClick={handleVerificationCodeSubmit}>
                            Submit
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Typography variant='h4' className='title'>
                            Sign Up.
                        </Typography>
                        <form autoComplete='off' onSubmit={handleSubmit}>
                            <Stack display='flex' alignItems='center'>
                                <div className='inputContainer'>
                                    <Typography variant='h5' className='subtitle'>
                                        Username
                                    </Typography>
                                    <TextField
                                        id='username'
                                        autoFocus
                                        type='text'
                                        value={input.username}
                                        onChange={(e) => {
                                            handleChange(0, e.target.value);
                                        }}
                                        placeholder='Username'
                                        variant='outlined'
                                        className='input'
                                        onFocus={() => {
                                            setUsernameFocus(true);
                                        }}
                                    />
                                </div>
                                <div className='inputContainer'>
                                    <Typography variant='h5' className='subtitle'>
                                        Email
                                    </Typography>
                                    <TextField
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
                                    Sign Up
                                </Button>
                                <Typography variant='h6' className='link'>
                                    Got an account? <Link href='/login'>Log in.</Link>
                                </Typography>
                            </Stack>
                        </form>
                    </div>
                )}
            </Paper>
            <Snackbar open={open.bool} autoHideDuration={5000} onClose={() => setOpen({ bool: false, message: '' })}>
                <Alert onClose={() => setOpen({ bool: false, message: '' })} severity='error' sx={{ width: '400px' }}>
                    {open.message}
                </Alert>
            </Snackbar>
            <Snackbar open={signedUp} autoHideDuration={5000} onClose={() => setSignedUp(false)}>
                <Alert onClose={() => setSignedUp(false)} severity='success' sx={{ width: '400px' }}>
                    Signed up successfully. <Link href='/login'>Log in.</Link>
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SignUpPage;
