/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../style/Navbar.scss';
import { AppBar, Toolbar, Stack, Typography, TextField } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const Navbar = () => {
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
                <div id='logo'>
                    <Typography variant='h3' className='myVibe'>
                        myvibe.
                    </Typography>
                </div>
                <TextField
                    InputProps={{ startAdornment: <SearchRoundedIcon fontSize='small' sx={{ mr: '5px' }} /> }}
                    id='searchBar'
                    onFocus={handleFocus}
                    placeholder='Search'
                    variant='outlined'
                    className='searchBar'
                />
                <div id='buttons' className='buttonsContainer'></div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
