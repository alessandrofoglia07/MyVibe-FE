/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import '../style/MainPage.scss';
import { Typography, Stack, Button, TextField, IconButton, Paper, Link, Modal, Box, Avatar } from '@mui/material';
import useTheme from '../hooks/useTheme';
import Navbar from '../components/navbar';
import { AuthContext } from '../context/AuthContext';
import authAxios from '../api/authAxiosApi';
import Post from '../components/Post';
import PostInput from '../components/PostInput';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const CloseIcon = CloseOutlinedIcon;

const MainPage = () => {
    useTheme();
    const [width, setWidth] = useState(window.innerWidth);
    const [followingList, setfollowingList] = useState<any[]>([]);
    const [posts, setPosts] = useState<any[]>([]);
    const [writingPost, setWritingPost] = useState<boolean>(false);
    const [postContent, setPostContent] = useState<string>('');

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        });
    }, []);

    const handleInputStart = () => {
        setWritingPost(true);
    };

    const { userInfo } = useContext(AuthContext);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        const res = await authAxios.get('/posts');
        setPosts(res.data.posts);
    };

    return (
        <div id='MainPage' className='page' style={{ display: 'inline' }}>
            <div id='top'>
                <Navbar />
            </div>
            <div id='bottom' className='bottom'>
                {width > 768 && <div id='left' className='left'></div>}
                <div id='center' className='center'>
                    <PostInput onClick={handleInputStart} />
                    {posts.length > 0 ? (
                        <Stack spacing={2} width='80%'>
                            {posts.map((post) => (
                                <Post
                                    key={post._id}
                                    _id={post._id}
                                    author={post.author}
                                    authorUsername={post.authorUsername}
                                    content={post.content}
                                    date={post.date}
                                    likes={post.likes.length}
                                    liked={post.liked}
                                    comments={post.comments}
                                />
                            ))}
                        </Stack>
                    ) : (
                        // TODO change this to a better looking component
                        <Typography variant='h6' className='noPostsText'>
                            No posts here... try following someone first...
                        </Typography>
                    )}
                </div>
                {width > 768 && (
                    <div id='right' className='right'>
                        <Paper elevation={0} className='followingList'>
                            {followingList.length > 0 ? (
                                <Stack spacing={2}>
                                    {followingList.map((following) => (
                                        <Typography key={following} variant='h6' className='following'>
                                            <Link href={`/profile/${following}`} className='followingLinks'>
                                                {following}
                                            </Link>
                                        </Typography>
                                    ))}
                                </Stack>
                            ) : (
                                <Typography variant='h6' className='noFollowingsText'>
                                    You are not following anyone yet...
                                </Typography>
                            )}
                        </Paper>
                    </div>
                )}
                <Modal open={writingPost} onClose={() => setWritingPost(false)}>
                    <Box className='postModal'>
                        <header>
                            <div className='headerLeft' />
                            <Typography variant='h6' className='title'>
                                Write a post.
                            </Typography>
                            <IconButton className='closeButton' onClick={() => setWritingPost(false)} disableRipple>
                                <CloseIcon />
                            </IconButton>
                        </header>
                        <main>
                            <Avatar className='avatar' />
                            <Typography variant='h6' className='username'>
                                {userInfo?.username}
                            </Typography>
                        </main>
                    </Box>
                </Modal>
            </div>
        </div>
    );
};

export default MainPage;
