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

        const addFocusClass = () => {
            searchBar?.classList.add('searchBarFocused');
            searchBar?.addEventListener('focusout', handleFocusOut);
        };

        const handleFocusOut = () => {
            searchBar?.classList.remove('searchBarFocused');
            searchBar?.classList.add('searchBarUnfocused');
            setTimeout(() => {
                searchBar?.classList.remove('searchBarUnfocused');
            }, 500);
        };

        const removeFocusClass = () => {
            searchBar?.classList.remove('searchBarFocused');
            searchBar?.removeEventListener('focusout', handleFocusOut);
        };

        const handleResize = () => {
            const width = window.innerWidth || document.documentElement.clientWidth;
            if (width > 768) {
                addFocusClass();
            } else {
                removeFocusClass();
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            removeFocusClass();
        };
    };

    const adornmentProps =
        width > 768
            ? {
                  startAdornment: <SearchRoundedIcon fontSize='small' sx={{ mr: '5px' }} />
              }
            : {
                  startAdornment: null
              };

    const logoClassnames = width > 768 ? 'myVibe' : 'myVibe smallerMyVibe';

    return (
        <div>
            <AppBar position='static' id='navbar' className='navbar'>
                <Toolbar className='toolbar'>
                    <div id='logo'>
                        <Typography variant='h3' className={logoClassnames}>
                            myvibe.
                        </Typography>
                    </div>
                    <TextField InputProps={adornmentProps} id='searchBar' onFocus={handleFocus} placeholder='Search' variant='outlined' className='searchBar' />
                    <div id='buttons' className='buttonsContainer'>
                        {width > 768 && (
                            <IconButton className='notificationBtn'>
                                <Badge badgeContent={1} color='error' variant='dot'>
                                    <NotificationIcon />
                                </Badge>
                            </IconButton>
                        )}
                        <Button className='avatarContainer' disableRipple href='/profile'>
                            <Avatar className='avatar' src='/assets/pfp-placeholder.png' alt='pfp'>
                                <PersonIcon />
                            </Avatar>
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            <div className='navbarSpacer' />
        </div>
    );
};

export default Navbar;
