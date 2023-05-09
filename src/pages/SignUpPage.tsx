import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, IconButton, Paper, Stack, Link } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import '../style/AuthPages.scss';

const Visibility = VisibilityOutlinedIcon;
const VisibilityOff = VisibilityOffOutlinedIcon;

const SignUpPage = () => {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [verifying, setVerifying] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, []);

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

        if (value.length === 1) {
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(input);
        // TODO: send input to backend
    };

    const handleVerificationCodeSubmit = () => {
        if (!verificationCode.every((digit) => digit !== '')) return;
        const code = verificationCode.join('');
        console.log(code);
        // TODO send code to backend
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
                            My<span>Vibe</span>
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
        </div>
    );
};

export default SignUpPage;
