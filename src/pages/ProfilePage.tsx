import React, { useState, useEffect, useContext } from 'react';
import '../style/ProfilePage.scss';
import Navbar from '../components/navbar';
import { useParams } from 'react-router-dom';
import authAxios from '../api/authAxiosApi';
import { Avatar, Typography, Stack, Button, Link } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Post from '../components/Post';
import formatDate from '../utils/formatDate';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';
import useTheme from '../hooks/useTheme';
import NotFoundPage from './404Page';
import VerifiedIcon from '../components/VerifiedIcon';
import { IUser, IPost } from '../types';
import { Helmet } from 'react-helmet';
import ErrorAlert from '../components/Error';

const LogoutIcon = LogoutRoundedIcon;

const ProfilePage: React.FC<any> = () => {
    const { themeColor } = useTheme();

    const { username } = useParams<{ username: string }>();

    const { logout } = useContext(AuthContext);

    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [following, setFollowing] = useState<boolean>(false);
    const [profile, setProfile] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [userNotFound, setUserNotFound] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        (async () => {
            try {
                await getData();
            } catch (err: any) {
                setError(err.response.data.message);
                throw new Error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const getData = async (): Promise<void> => {
        try {
            const resProfile = await authAxios.get(`/users/profile/${username}`);

            if (!resProfile.data.user) {
                setUserNotFound(true);
                return;
            }

            setUser(resProfile.data.user);
            setFollowing(resProfile.data.isFollowing);
            setProfile(resProfile.data.isProfile);

            const resPosts = await authAxios.get(`/users/posts/${username}`);
            setPosts(resPosts.data.posts);

            const resPfp = await authAxios.get(`/users/pfp/${username}`, { responseType: 'blob' });
            const imageUrl = URL.createObjectURL(resPfp.data);
            setImageUrl(imageUrl);
        } catch (err: any) {
            setError(err.response.data.message);
            setUserNotFound(true);
            throw new Error(err);
        }
    };

    const handleFollow = async (): Promise<void> => {
        try {
            const res = await authAxios.post(`/users/follow/${user?._id}`);
            setFollowing(true);
            setUser((prev) => {
                if (prev) {
                    return {
                        ...prev,
                        followersIDs: [...prev.followersIDs, res.data.followerID]
                    };
                }
                return prev;
            });
        } catch (err: any) {
            setError(err.response.data.message);
            throw new Error(err);
        }
    };

    const handleUnfollow = async (): Promise<void> => {
        try {
            const res = await authAxios.post(`/users/unfollow/${user?._id}`);
            setFollowing(false);
            setUser((prev) => {
                if (prev) {
                    return {
                        ...prev,
                        followersIDs: prev.followersIDs.filter((id) => id !== res.data.followerID)
                    };
                }
                return prev;
            });
        } catch (err: any) {
            setError(err.response.data.message);
            throw new Error(err);
        }
    };

    const pfpSrc = imageUrl?.length > 0 ? imageUrl : '/assets/pfp-placeholder.png';

    return (
        <div id='ProfilePage'>
            <Helmet>
                <title id='title'>{`${username} - MyVibe.`}</title>
                <meta name='description' content={`${username}'s profile page`} />
                <meta name='theme-color' content={themeColor} />
            </Helmet>
            {userNotFound ? (
                <NotFoundPage />
            ) : (
                <>
                    <header>
                        <Navbar />
                    </header>
                    <main>
                        {loading ? (
                            <Loading />
                        ) : (
                            <>
                                <div className='top'>
                                    <Button className='avatarContainer' disableRipple href={`/profile/${username}`}>
                                        <Avatar className='avatar' src={pfpSrc} alt='pfp'>
                                            <PersonIcon sx={{ fontSize: '80px' }} />
                                        </Avatar>
                                    </Button>
                                    <div>
                                        <Typography component='p' className='username'>
                                            <b>{username}</b> {user?.verified && <VerifiedIcon className='verified' />}
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
                                <div className='limit' />
                                <div className='middle'>
                                    <Stack direction='row' spacing={3} className='numericStats'>
                                        <Link className='following' href={(user?.followingIDs.length as number) > 0 ? `/profile/${username}/following` : undefined}>
                                            Following <br /> {user?.followingIDs.length}
                                        </Link>
                                        <Link className='followers' href={(user?.followersIDs.length as number) > 0 ? `/profile/${username}/followers` : undefined}>
                                            Followers <br /> {user?.followersIDs.length}
                                        </Link>
                                    </Stack>
                                    {profile ? (
                                        <Button disableRipple variant='contained' className='profileButton' href='/profile/edit'>
                                            Edit
                                        </Button>
                                    ) : following ? (
                                        <Button disableRipple variant='contained' className='unfollowButton' onClick={handleUnfollow}>
                                            Unfollow
                                        </Button>
                                    ) : (
                                        <Button disableRipple variant='contained' className='profileButton' onClick={handleFollow}>
                                            Follow
                                        </Button>
                                    )}
                                    <Typography component='p' className='bio'>
                                        {user?.info.bio || 'No bio yet.'}
                                    </Typography>
                                </div>
                                <div className='limit' />
                                <div className='bottomStats'>
                                    <Typography component='p' className='createdAt'>
                                        Joined {formatDate(user?.createdAt as Date)}
                                    </Typography>
                                    {profile && (
                                        <Button disableRipple variant='contained' className='logoutButton' endIcon={<LogoutIcon />} onClick={logout}>
                                            <b>Log out</b>
                                        </Button>
                                    )}
                                </div>
                                {profile && <div className='limit' />}
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
                                                    authorVerified={post.authorVerified}
                                                />
                                            ))}
                                        </Stack>
                                    ) : (
                                        <Typography variant='h6' className='noPostsText'>
                                            No posts here...
                                        </Typography>
                                    )}
                                    <div className='spacer' />
                                </div>
                            </>
                        )}
                    </main>
                </>
            )}
            {error && <ErrorAlert message={error} close={() => setError('')} />}
        </div>
    );
};

export default ProfilePage;
