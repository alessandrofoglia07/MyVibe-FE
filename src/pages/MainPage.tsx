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
import Loading from '../components/Loading';
import FollowingLink from '../components/followingLink';
import { IPost, IUser } from '../types';
import SuggestedUser from '../components/SuggestedUser';

const MainPage: React.FC<any> = () => {
    useTheme();
    const [width, setWidth] = useState(window.innerWidth);
    const [followingList, setFollowingList] = useState<string[]>([]);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [writingPost, setWritingPost] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [postCount, setPostCount] = useState(0);
    const [suggestedUsers, setSuggestedUsers] = useState<IUser[]>([]);
    const [suggestedUsersCount, setSuggestedUsersCount] = useState(0);
    const [suggestedUsersPage, setSuggestedUsersPage] = useState(1);
    const [showRefresh, setShowRefresh] = useState(false);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        });
        setPage(1);
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
            } catch (err: any) {
                throw new Error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        if (posts.length === 0) {
            (async () => {
                try {
                    await getSuggestedUsers();
                } catch (err: any) {
                    throw new Error(err);
                }
            })();
        } else {
            setSuggestedUsers([]);
            setSuggestedUsersCount(0);
            setSuggestedUsersPage(1);
        }

        return () => {
            setSuggestedUsers([]);
            setSuggestedUsersCount(0);
            setSuggestedUsersPage(1);
        };
    }, []);

    useEffect(() => {
        setShowRefresh(false);
    }, []);

    const getSuggestedUsers = async (): Promise<void> => {
        try {
            const res = await authAxios.get(`/users/suggestions?page=${suggestedUsersPage}&limit=5`);
            setSuggestedUsers(res.data.users);
            setSuggestedUsersCount(res.data.usersCount);
            setSuggestedUsersPage((prev) => prev + 1);
        } catch (err: any) {
            throw new Error(err);
        }
    };

    const getFollowingList = async () => {
        try {
            const res = await authAxios.get('/users/following');
            setFollowingList(res.data.usernames);
        } catch (err: any) {
            throw new Error(err);
        }
    };

    const getPosts = async () => {
        try {
            const res = await authAxios.get(`/posts`);
            setPosts(res.data.posts);
            setPage((prev) => prev + 1);
            setPostCount(res.data.numPosts);
        } catch (err: any) {
            throw new Error(err);
        }
    };

    const getMorePosts = async () => {
        try {
            const res = await authAxios.get(`/posts?page=${page}`);
            setPosts((prev) => [...prev, ...res.data.posts]);
            setPage((prev) => prev + 1);
            setPostCount(res.data.numPosts);
        } catch (err: any) {
            throw new Error(err);
        }
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
                                            authorVerified={post.authorVerified}
                                        />
                                    ))}
                                </Stack>
                            ) : (
                                <>
                                    <div className='suggestedUsersContainer'>
                                        {suggestedUsers.map(({ _id, username, verified }) => (
                                            <SuggestedUser refresh={() => setShowRefresh(true)} _id={_id} username={username} verified={verified} key={_id} />
                                        ))}
                                    </div>
                                    {showRefresh && (
                                        <Link onClick={() => window.location.reload()} className='refreshText'>
                                            Refresh
                                        </Link>
                                    )}
                                </>
                            )}
                            {posts.length < postCount ? (
                                <Link onClick={getMorePosts} className='loadMoreText'>
                                    Load more
                                </Link>
                            ) : posts.length !== 0 ? (
                                <Typography className='noMorePostsText unselectable'>
                                    No more posts to load. <br /> You should really take a break now...
                                </Typography>
                            ) : null}
                            <div className='spacer' />
                        </>
                    ) : (
                        <Loading />
                    )}
                </div>
                {width > 768 && (
                    <div id='right' className='right'>
                        <Paper elevation={0} className='followingList'>
                            {!loading && (
                                <>
                                    {followingList?.length > 0 ? (
                                        <Stack spacing={2}>
                                            <Typography variant='h6' className='followingListTitle unselectable'>
                                                Following
                                            </Typography>
                                            {followingList.map((following) => (
                                                <FollowingLink key={following} username={following} />
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
