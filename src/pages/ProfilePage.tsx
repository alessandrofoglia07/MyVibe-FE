/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../style/ProfilePage.scss';
import Navbar from '../components/navbar';
import { useParams } from 'react-router-dom';
import authAxios from '../api/authAxiosApi';
import { Avatar, Typography, Stack, Button } from '@mui/material';
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

const ProfilePage = () => {
    const { username } = useParams<{ username: string }>();
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async (): Promise<void> => {
        try {
            const res = await authAxios.get(`/users/profile/${username}`);
            setUser(res.data.user);
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
                {/* TODO Fix this */}
                <Button className='avatarContainer' disableRipple href={`/profile/${username}`}>
                    <Avatar className='avatar' src='/assets/pfp-placeholder.png' alt='pfp'>
                        <PersonIcon />
                    </Avatar>
                </Button>
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
                <Typography component='p' className='bio'>
                    {user?.info.bio || 'No bio yet.'}
                </Typography>
                <Typography component='p' className='following'>
                    Following <br /> {user?.followingIDs.length}
                </Typography>
                <Typography component='p' className='followers'>
                    Followers <br /> {user?.followersIDs.length}
                </Typography>
                <Typography component='p' className='createdAt'>
                    Joined {formatDate(user?.createdAt as Date)}
                </Typography>
            </main>
        </div>
    );
};

export default ProfilePage;
