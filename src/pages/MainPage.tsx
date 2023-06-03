import React, { useState, useEffect, useContext } from 'react';
import '../style/MainPage.scss';
import { Typography, Stack, Paper, Link } from '@mui/material';
import useTheme from '../hooks/useTheme';
import Navbar from '../components/navbar';
import { AuthContext } from '../context/AuthContext';
import authAxios from '../api/authAxiosApi';
import Post from '../components/Post';
import PostInput from '../components/PostInput';
import InputModal from '../components/InputModal';
import CircularProgress from '@mui/material/CircularProgress';

interface IPost {
    _id: string;
    author: string;
    authorUsername: string;
    content: string;
    likes: string[];
    comments: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    liked: boolean;
}

const MainPage: React.FC<any> = () => {
    useTheme();
    const [width, setWidth] = useState(window.innerWidth);
    const [followingList, setFollowingList] = useState<string[]>([]);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [writingPost, setWritingPost] = useState(false);
    const [loading, setLoading] = useState(false);

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
        (async () => {
            try {
                setLoading(true);
                await getPosts();
                await getFollowingList();
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const getFollowingList = async () => {
        const res = await authAxios.get('/users/following');
        setFollowingList(res.data.usernames);
    };

    const getPosts = async () => {
        const res = await authAxios.get('/posts');
        setPosts(res.data.posts);
    };

    return (
        <div id='MainPage' className='page' style={{ display: 'inline' }}>
            <header id='top'>
                <Navbar />
            </header>
            <main id='bottom' className='bottom'>
                {width > 768 && <div id='left' className='left'></div>}
                <div id='center' className='center'>
                    <PostInput onClick={handleInputStart} />
                    {!loading ? (
                        <>
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
                                // TODO change this to a better looking component
                                <Typography variant='h6' className='noPostsText'>
                                    No posts here... try following someone first...
                                </Typography>
                            )}
                        </>
                    ) : (
                        <CircularProgress className='circularProgress' />
                    )}
                </div>
                {width > 768 && (
                    <div id='right' className='right'>
                        <Paper elevation={0} className='followingList'>
                            {!loading && (
                                <>
                                    {followingList?.length > 0 ? (
                                        <Stack spacing={2}>
                                            <Typography variant='h6' className='followingListTitle'>
                                                Following
                                            </Typography>
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
                                </>
                            )}
                        </Paper>
                    </div>
                )}
                {writingPost && <InputModal type='post' close={() => setWritingPost(false)} userInfo={userInfo} />}
            </main>
        </div>
    );
};

export default MainPage;
