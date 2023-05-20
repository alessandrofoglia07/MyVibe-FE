/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import '../style/MainPage.scss';
import { Typography, Stack, Button, TextField, IconButton, Paper } from '@mui/material';
import useTheme from '../hooks/useTheme';
import Navbar from '../components/navbar';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Post, { postProps } from '../components/Post';

const MainPage = () => {
    const { toggleThemeTo, toggleTheme } = useTheme();
    const [width, setWidth] = useState(window.innerWidth);
    const [friendList, setFriendList] = useState<any[]>([]);
    const [posts, setPosts] = useState<postProps[]>([]);

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
        setPosts([
            {
                _id: '1',
                user: 'friend1',
                content:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                date: '2021-10-10',
                likes: 1000,
                comments: 234,
                liked: true
            },
            {
                _id: '2',
                user: 'friend2WithAVeryLongLongName',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                date: '2021-10-10',
                likes: 100000000,
                comments: 879,
                liked: false
            },
            {
                _id: '3',
                user: 'friend3',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                date: '2021-10-10',
                likes: 1000,
                comments: 234,
                liked: true
            }
        ]);
    }, []);

    const getPosts = async () => {
        const res = await axios.get(`http://localhost:5000/api/posts/getPosts/${userInfo?.userId}`);
        setPosts(res.data);
    };

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
                    {posts.length > 0 ? (
                        <Stack spacing={2}>
                            {posts.map((post) => (
                                <Post
                                    key={post._id}
                                    _id={post._id}
                                    user={post.user}
                                    content={post.content}
                                    date={post.date}
                                    likes={post.likes}
                                    liked={post.liked}
                                    comments={post.comments}
                                />
                            ))}
                        </Stack>
                    ) : (
                        <Typography variant='h6' className='noPostsText'>
                            No posts
                        </Typography>
                    )}
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
