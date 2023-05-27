/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../style/ProfilePage.scss';
import Navbar from '../components/navbar';
import { useParams } from 'react-router-dom';
import authAxios from '../api/authAxiosApi';
import { Avatar, Typography, Stack, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Post from '../components/Post';

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

    const formatDate = (date: Date): string => {
        const d = new Date(date);
        const day = d.getUTCDate() < 10 ? '0' + d.getUTCDate() : d.getUTCDate();
        const month = d.getUTCMonth() + 1 < 10 ? '0' + (d.getUTCMonth() + 1) : d.getUTCMonth() + 1;
        const year = d.getUTCFullYear();
        return `${day}/${month}/${year}`;
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
                <Typography variant='h4' className='username'>
                    {username}
                </Typography>
                <Typography variant='h6' className='email'>
                    {user?.email}
                </Typography>
                {user?.info.firstName && user?.info.lastName ? (
                    <Typography variant='h6' className='fullName'>
                        {user?.info.firstName + ' ' + user?.info.lastName}
                    </Typography>
                ) : null}
                <Typography variant='h6' className='bio'>
                    {user?.info.bio || 'No bio yet.'}
                </Typography>
                <Typography variant='h6' className='following'>
                    Following <br /> {user?.followingIDs.length}
                </Typography>
                <Typography variant='h6' className='followers'>
                    Followers <br /> {user?.followersIDs.length}
                </Typography>
                <Typography variant='h6' className='createdAt'>
                    Joined {formatDate(user?.createdAt as Date)}
                </Typography>
            </main>
        </div>
    );
};

export default ProfilePage;
