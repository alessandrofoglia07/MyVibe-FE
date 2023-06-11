import React from 'react';
import { Typography, Link } from '@mui/material';
import '../style/followingLink.scss';
import Pfp from './Pfp';

interface IProps {
    username: string;
}

const FollowingLink: React.FC<IProps> = ({ username }: IProps) => {
    return (
        <div id='FollowingLink'>
            <Pfp username={username} type='Profile' />
            <Typography variant='h6' className='following'>
                <Link href={`/profile/${username}`} className='followingLinks'>
                    {username}
                </Link>
            </Typography>
        </div>
    );
};

export default FollowingLink;
