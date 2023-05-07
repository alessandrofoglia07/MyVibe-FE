import React, { useState } from 'react';
import { Typography, TextField, Button, IconButton, Paper, Stack } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import '../styles/authPages.css';

const Visibility = VisibilityOutlinedIcon;
const VisibilityOff = VisibilityOffOutlinedIcon;

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: ''
    });

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

    return (
        <div id='SignUpPage' className='page signupPage'>
            <div id='bg'>
                <div className='ball' />
                <div className='ball' />
                <div className='ball' />
            </div>
            <StyledEngineProvider injectFirst>
                <Paper className='form'>
                    <Typography variant='h4' className='title'>
                        Sign Up
                    </Typography>
                    <form autoComplete='off' onSubmit={handleSubmit}>
                        <Stack display='flex' alignItems='center'>
                            <div className='inputContainer'>
                                <Typography variant='h5' className='subtitle'>
                                    Username
                                </Typography>
                                <TextField
                                    autoFocus
                                    type='text'
                                    value={input.username}
                                    onChange={(e) => {
                                        handleChange(0, e.target.value);
                                    }}
                                    placeholder='Username'
                                    variant='outlined'
                                    className='input'
                                />
                            </div>
                            <div className='inputContainer'>
                                <Typography variant='h5' className='subtitle'>
                                    Email
                                </Typography>
                                <TextField
                                    type='email'
                                    value={input.email}
                                    onChange={(e) => {
                                        handleChange(1, e.target.value);
                                    }}
                                    placeholder='Email'
                                    variant='outlined'
                                    className='input'
                                />
                            </div>
                            <div className='inputContainer'>
                                <Typography variant='h5' className='subtitle'>
                                    Password
                                </Typography>
                                <TextField
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
                                />
                            </div>
                            <Button disableRipple variant='contained' className='submitBtn' type='submit'>
                                Sign Up
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </StyledEngineProvider>
        </div>
    );
};

export default SignUpPage;
