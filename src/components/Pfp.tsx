import React, { useState, useEffect } from 'react';
import { Button, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import '../style/Pfp.scss';
import authAxios from '../api/authAxiosApi';
import LazyLoad from 'react-lazyload';

interface IProps {
    type: 'Post' | 'Profile' | 'Comment' | 'PostInput' | 'Link' | 'Card' | 'Notification';
    username: string | undefined;
    unclickable?: boolean;
}

const Pfp: React.FC<IProps> = (props: IProps) => {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            try {
                await getPfp();
            } catch (err: any) {
                throw new Error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const getPfp = async () => {
        if (props.username === undefined) return;

        try {
            const res = await authAxios.get(`/users/pfp/${props.username}`, { responseType: 'blob' });
            setImageUrl(URL.createObjectURL(res.data));
        } catch (err: any) {
            throw new Error(err);
        }
    };

    return (
        <div id='Pfp'>
            {loading ? (
                <div className={`avatarContainer${props.type}`} />
            ) : (
                <LazyLoad>
                    <Button aria-label='pfpBtn' className={`avatarContainer${props.type}`} disableRipple disabled={props.unclickable} href={`/profile/${props.username}`}>
                        <Avatar className={`avatar${props.type}`} src={imageUrl} alt='pfp'>
                            <PersonIcon />
                        </Avatar>
                    </Button>
                </LazyLoad>
            )}
        </div>
    );
};

export default Pfp;
