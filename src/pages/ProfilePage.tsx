/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../style/ProfilePage.scss';
import Navbar from '../components/navbar';
import { useParams } from 'react-router-dom';
import authAxios from '../api/authAxiosApi';
import { Avatar, Typography, Stack, Button, CircularProgress } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Post from '../components/Post';
import formatDate from '../utils/formatDate';

interface IUser {
    _id: string;
    username: string;
    email: string;
    info: any;
    postsIDs: string[];
    followingIDs: string[];
    followersIDs: string[];
    createdAt: Date;
}

interface IPost {
    _id: string;
    author: string;
    authorUsername: string;
    content: string;
    likes: string[];
    comments: string[];
    createdAt: string;
    updatedAt: string;
    liked: boolean;
}

const ProfilePage = () => {
    const { username } = useParams<{ username: string }>();
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        (async () => {
            try {
                await getUserData();
                await getPosts();
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const getUserData = async (): Promise<void> => {
        try {
            const res = await authAxios.get(`/users/profile/${username}`);
            setUser(res.data.user);
        } catch (err) {
            console.log(err);
        }
    };

    const getPosts = async (): Promise<void> => {
        try {
            const res = await authAxios.get(`/users/posts/${username}`);
            setPosts(res.data.posts);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div id='ProfilePage'>
            <header>
                <Navbar />
            </header>
            <main>
                {loading ? (
                    <CircularProgress className='loading' />
                ) : (
                    <>
                        <div className='top'>
                            <Button className='avatarContainer' disableRipple href={`/profile/${username}`}>
                                <Avatar className='avatar' src='/assets/pfp-placeholder.png' alt='pfp'>
                                    <PersonIcon sx={{ fontSize: '80px' }} />
                                </Avatar>
                            </Button>
                            <div>
                                <Typography component='p' className='username'>
                                    {username}
                                </Typography>
                                <Typography component='p' className='email'>
                                    {user?.email}
                                </Typography>
                                {user?.info.firstName && user?.info.lastName ? (
                                    <Typography component='p' className='fullName'>
                                        {user?.info.firstName + ' ' + user?.info.lastName}
                                    </Typography>
                                ) : null}
                            </div>
                        </div>
                        <Stack direction='row' spacing={3} className='numericStats'>
                            <Typography component='p' className='following'>
                                Following <br /> {user?.followingIDs.length}
                            </Typography>
                            <Typography component='p' className='followers'>
                                Followers <br /> {user?.followersIDs.length}
                            </Typography>
                        </Stack>
                        <Typography component='p' className='bio'>
                            {user?.info.bio || 'No bio yet.'}
                        </Typography>
                        <Typography component='p' className='createdAt'>
                            Joined {formatDate(user?.createdAt as Date)}
                        </Typography>
                        <div className='posts'>
                            <Typography component='p' className='postsTitle'>
                                Featured Posts
                            </Typography>
                            {posts.length > 0 ? (
                                <Stack spacing={2} width='80%'>
                                    {posts.map((post) => (
                                        <Post
                                            key={post._id}
                                            _id={post._id}
                                            author={post.author}
                                            authorUsername={post.authorUsername}
                                            content={post.content}
                                            date={post.createdAt}
                                            likes={post.likes.length}
                                            liked={post.liked}
                                            comments={post.comments}
                                        />
                                    ))}
                                </Stack>
                            ) : (
                                <Typography variant='h6' className='noPostsText'>
                                    No posts here...
                                </Typography>
                            )}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default ProfilePage;
