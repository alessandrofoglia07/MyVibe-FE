/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import '../style/MainPage.scss';
import { Typography, Stack, Button, TextField, IconButton, Paper } from '@mui/material';
import useTheme from '../hooks/useTheme';
import Navbar from '../components/navbar';
import { AuthContext } from '../context/AuthContext';

const MainPage = () => {
    const { toggleThemeTo, toggleTheme } = useTheme();
    const [width, setWidth] = useState(window.innerWidth);
    const [friendList, setFriendList] = useState<any[]>([]);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        });
    }, []);

    const { userInfo } = useContext(AuthContext);

    const changeFriends = () => {
        if (friendList.length > 0) {
            setFriendList([]);
        } else {
            setFriendList(['friend1', 'friend2WithAVeryLongLongName', 'friend3', 'friend4', 'friend5', 'friend6', 'friend7', 'friend8', 'friend9', 'friend10', 'friend11', 'friend12']);
        }
    };

    useEffect(() => {
        toggleThemeTo('light');
    }, []);

    return (
        <div id='MainPage' className='page' style={{ display: 'inline' }}>
            <div id='top'>
                <Navbar />
            </div>
            <div id='bottom' className='bottom'>
                {width > 768 && <div id='left' className='left'></div>}
                <div id='center' className='center'>
                    <Button
                        variant='contained'
                        onClick={() => {
                            toggleTheme();
                        }}>
                        Change theme
                    </Button>
                    <Button
                        variant='contained'
                        onClick={() => {
                            changeFriends();
                        }}>
                        Change friends
                    </Button>
                </div>
                {width > 768 && (
                    <div id='right' className='right'>
                        <Paper elevation={0} className='friendList'>
                            {friendList.length > 0 ? (
                                <Stack spacing={2}>
                                    {friendList.map((friend) => {
                                        const shortenFriend = friend.length > 20 ? friend.substring(0, 20) + '...' : friend;
                                        return (
                                            <Typography key={friend} variant='h6' className='friend'>
                                                {shortenFriend}
                                            </Typography>
                                        );
                                    })}
                                </Stack>
                            ) : (
                                <Typography variant='h6' className='noFriendsText'>
                                    No friends
                                </Typography>
                            )}
                        </Paper>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainPage;
