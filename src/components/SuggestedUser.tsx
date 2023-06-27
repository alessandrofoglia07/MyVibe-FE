import React, { useState } from 'react';
import authAxios from '../api/authAxiosApi';
import '../style/SuggestedUser.scss';
import { Card, Button } from '@mui/material';
import Pfp from './Pfp';
import { Link } from '@mui/material';
import VerifiedIcon from './VerifiedIcon';
import ErrorAlert from './Error';

interface IProps {
    refresh: () => void;
    _id: string;
    username: string;
    verified: boolean;
}

const SuggestedUser: React.FC<IProps> = ({ refresh, _id, username, verified }: IProps) => {
    const [following, setFollowing] = useState(false);
    const [error, setError] = useState<string>('');

    const handleFollow = async (): Promise<void> => {
        try {
            if (following) {
                await authAxios.post(`/users/unfollow/${_id}`);
                setFollowing(false);
            } else {
                await authAxios.post(`/users/follow/${_id}`);
                setFollowing(true);
                refresh();
            }
        } catch (err: any) {
            setError(err.response.data.message);
            throw new Error(err);
        }
    };

    return (
        <Card className='suggestedUserCard'>
            <Pfp type='Card' username={username} />
            <Link className='username' href={`/profile/${username}`}>
                <strong>{username}</strong> {verified && <VerifiedIcon className='verified' />}
            </Link>
            {!following ? (
                <Button onClick={handleFollow} className='followButton'>
                    Follow
                </Button>
            ) : (
                <Button onClick={handleFollow} className='unfollowButton'>
                    Unfollow
                </Button>
            )}
            {error && <ErrorAlert message={error} close={() => setError('')} />}
        </Card>
    );
};

export default SuggestedUser;
