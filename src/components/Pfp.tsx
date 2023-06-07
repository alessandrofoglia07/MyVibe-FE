import React, { useState, useEffect } from 'react';
import { Button, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import '../style/Pfp.scss';
import authAxios from '../api/authAxiosApi';

interface IProps {
    type: 'Post' | 'Profile' | 'Comment';
    username: string | undefined;
}

const Pfp: React.FC<IProps> = (props: IProps) => {
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        (async () => {
            await getPfp();
        })();
    }, []);

    const getPfp = async () => {
        if (props.username === undefined) return;
        const res = await authAxios.get(`/users/pfp/${props.username}`, { responseType: 'blob' });
        setImageUrl(URL.createObjectURL(res.data));
    };

    return (
        <div id='Pfp'>
            <Button className={`avatarContainer${props.type}`} disableRipple href={`/profile/${props.username}`}>
                <Avatar className={`avatar${props.type}`} src={imageUrl} alt='pfp'>
                    <PersonIcon />
                </Avatar>
            </Button>
        </div>
    );
};

export default Pfp;
