import React, { useState, useEffect } from 'react';
import '../style/Navbar.scss';
import { AppBar, Toolbar, Typography, TextField, Avatar, Button, IconButton, Badge } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import useTheme from '../hooks/useTheme';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

const NotificationIcon = NotificationsNoneRoundedIcon;
const LightModeIcon = WbSunnyOutlinedIcon;
const DarkModeIcon = DarkModeOutlinedIcon;

const Navbar = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [mobileSearchbarOpen, setMobileSearchbarOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const { toggleTheme } = useTheme();

    const handleThemeChange = () => {
        toggleTheme();
        setTheme(localStorage.getItem('theme') || 'light');
    };

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        });
    }, []);

    useEffect(() => {
        if (width >= 768) {
            setMobileSearchbarOpen(false);
        }
    }, [width]);

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

    const handleSearchbarOpen = () => {
        setMobileSearchbarOpen(true);

        setTimeout(() => {
            const searchBar = document.getElementById('searchBar');

            if (searchBar) {
                searchBar.focus();
                searchBar.addEventListener('focusout', handleSearchbarClose);
            }
        }, 50);
    };

    const handleSearchbarClose = () => {
        const searchBar = document.getElementById('searchBar');

        if (searchBar) {
            searchBar.removeEventListener('focusout', handleSearchbarClose);
            searchBar.classList.remove('searchBarMobileShow');
            setMobileSearchbarOpen(false);
        }
    };

    const logoClassnames = width > 768 ? 'myVibe' : 'myVibe smallerMyVibe';

    return (
        <>
            <AppBar position='static' id='navbar' className='navbar'>
                <Toolbar className='toolbar' sx={{ justifyContent: mobileSearchbarOpen ? 'center' : 'space-between' }}>
                    {!mobileSearchbarOpen && (
                        <div id='logo'>
                            <Typography variant='h3' className={logoClassnames}>
                                myvibe.
                            </Typography>
                        </div>
                    )}

                    {width > 768 ? (
                        // Desktop navbar
                        <>
                            <TextField
                                InputProps={{
                                    startAdornment: <SearchRoundedIcon fontSize='small' sx={{ mr: '5px' }} />
                                }}
                                id='searchBar'
                                onFocus={handleFocus}
                                placeholder='Search'
                                variant='outlined'
                                className='searchBar'
                            />
                            <div id='buttons' className='buttonsContainer'>
                                <IconButton className='themeBtn' onClick={handleThemeChange}>
                                    {theme === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
                                </IconButton>
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
                        </>
                    ) : (
                        // Mobile navbar
                        <>
                            {mobileSearchbarOpen ? (
                                <TextField
                                    id='searchBar'
                                    placeholder='Search'
                                    variant='outlined'
                                    className='searchBarMobile searchBarMobileShow'
                                    InputProps={{
                                        startAdornment: <SearchRoundedIcon fontSize='small' sx={{ mr: '5px' }} />
                                    }}
                                />
                            ) : (
                                <div id='buttons' className='buttonsContainer'>
                                    <IconButton className='searchBtn' onClick={handleSearchbarOpen}>
                                        <SearchRoundedIcon />
                                    </IconButton>
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
                            )}
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <div className='navbarSpacer' />
        </>
    );
};

export default Navbar;
