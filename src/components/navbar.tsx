/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../style/Navbar.scss';
import { AppBar, Toolbar, Stack, Typography, TextField, Avatar, Button, IconButton, Badge } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';

const NotificationIcon = NotificationsNoneRoundedIcon;

const Navbar = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        });
    }, []);

    const handleFocus = () => {
        const searchBar = document.getElementsByClassName('searchBar')[0];
        searchBar?.classList.add('searchBarFocused');
        searchBar?.addEventListener('focusout', () => {
            searchBar?.classList.remove('searchBarFocused');
            searchBar?.classList.add('searchBarUnfocused');
            setTimeout(() => {
                searchBar?.classList.remove('searchBarUnfocused');
            }, 500);
        });
    };

    return (
        <AppBar position='static' id='navbar' className='navbar'>
            <Toolbar className='toolbar'>
                {width > 768 && (
                    <div id='logo'>
                        <Typography variant='h3' className='myVibe'>
                            myvibe.
                        </Typography>
                    </div>
                )}
                <TextField
                    InputProps={{ startAdornment: <SearchRoundedIcon fontSize='small' sx={{ mr: '5px' }} /> }}
                    id='searchBar'
                    onFocus={handleFocus}
                    placeholder='Search'
                    variant='outlined'
                    className='searchBar'
                />
                <div id='buttons' className='buttonsContainer'>
                    <IconButton className='notificationBtn'>
                        <Badge badgeContent={1} color='error' variant='dot'>
                            <NotificationIcon />
                        </Badge>
                    </IconButton>
                    <Button className='avatarContainer' disableRipple href='/profile'>
                        <Avatar className='avatar' src='/assets/pfp-placeholder.png' alt='pfp'>
                            <PersonIcon />
                        </Avatar>
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
