import React from 'react';
import { Typography, Link } from '@mui/material';
import '../style/followingLink.scss';
import Pfp from './Pfp';
import VerifiedIcon from './VerifiedIcon';

interface IProps {
    username: string;
    verified?: boolean;
}

const FollowingLink: React.FC<IProps> = ({ username, verified = false }: IProps) => {
    return (
        <div id='FollowingLink'>
            <Pfp username={username} type='Link' />
            <Typography variant='h6' className='following'>
                <Link href={`/profile/${username}`} className='followingLinks'>
                    {username} {verified && <VerifiedIcon className='verified' />}
                </Link>
            </Typography>
        </div>
    );
};

export default FollowingLink;
