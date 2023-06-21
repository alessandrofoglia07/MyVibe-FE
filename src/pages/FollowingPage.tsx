import React, { useState, useEffect } from 'react';
import FollowingLink from '../components/followingLink';
import '../style/UserTablesPages.scss';
import { IUser } from '../types';
import authAxios from '../api/authAxiosApi';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import { Typography, Link, IconButton } from '@mui/material';
import Loading from '../components/Loading';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import useTheme from '../hooks/useTheme';
import { Helmet } from 'react-helmet';

const FollowingPage: React.FC<any> = () => {
    const username = useParams<any>().username;
    const navigate = useNavigate();
    const { themeColor } = useTheme();

    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [usersCount, setUsersCount] = useState<number>(0);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await authAxios.get(`/users/following/${username}?page=1&limit=10`);
                setUsers(res.data.users);
                setUsersCount(res.data.usersCount);
                setPage(2);
            } catch (err: any) {
                throw new Error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const getMoreUsers = async (): Promise<void> => {
        try {
            const res = await authAxios.get(`/users/following/${username}?page=${page + 1}&limit=10`);
            setUsers([...users, ...res.data.users]);
            setPage((prev) => prev + 1);
        } catch (err: any) {
            throw new Error(err);
        }
    };

    return (
        <div className='followersPage'>
            <Helmet>
                <title>{username}'s following - MyVibe.</title>
                <meta name='description' content={`People that ${username} follows`} />
                <meta name='theme-color' content={themeColor} />
            </Helmet>
            <header>
                <Navbar />
            </header>
            <main>
                <IconButton className='backButton' onClick={() => navigate(`/profile/${username}`)}>
                    <NavigateBeforeIcon />
                </IconButton>
                <div className='center'>
                    <Typography className='title'>
                        <strong>
                            <span className='unselectable'>People that</span> <br /> {username} <span className='unselectable'>follows</span>
                        </strong>
                    </Typography>
                    <div className='usersContainer'>
                        {loading ? (
                            <Loading />
                        ) : (
                            <>
                                {users.map(({ _id, username, verified }) => (
                                    <FollowingLink username={username} verified={verified} key={_id} />
                                ))}
                                {usersCount > users.length && (
                                    <Link className='loadMore' onClick={getMoreUsers}>
                                        Load more
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FollowingPage;
