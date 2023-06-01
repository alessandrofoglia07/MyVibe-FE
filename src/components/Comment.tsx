import React, { useState } from 'react';
import '../style/Comment.scss';
import { Stack, Typography, Avatar, IconButton, Button, Link } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LikeIconEmpty from '@mui/icons-material/FavoriteBorderRounded';
import LikeIconFilled from '@mui/icons-material/FavoriteRounded';
import abbreviate from '../utils/abbreviateNumber';
import authAxios from '../api/authAxiosApi';

interface IProps {
    _id: string;
    author: string;
    authorUsername: string;
    content: string;
    likes: number;
    liked: boolean;
}

const Comment = (props: IProps) => {
    const [liked, setLiked] = useState<boolean>(props.liked);
    const [likes, setLikes] = useState<number>(props.likes);

    const handleLike = async () => {
        const res = await authAxios.post(`/posts/comments/like/${props._id}`);
        if (res.data.message === 'Comment liked') {
            setLiked(true);
            setLikes(likes + 1);
        } else if (res.data.message === 'Comment unliked') {
            setLiked(false);
            setLikes(likes - 1);
        }
    };

    return (
        <div id='Comment'>
            <Stack spacing={2} className='commentContainer'>
                <Button className='avatarContainer' disableRipple href={`/profile/${props.authorUsername}`}>
                    <Avatar className='avatar' src='/assets/pfp-placeholder.png' alt='pfp'>
                        <PersonIcon />
                    </Avatar>
                </Button>
                <div className='commentMain'>
                    <Link variant='h6' className='username' href={`/profile/${props.authorUsername}`}>
                        {props.authorUsername}
                    </Link>
                    <Typography variant='body1' className='content'>
                        {props.content}
                    </Typography>
                    <div className='commentFooter'>
                        <IconButton className='likeButton' onClick={handleLike}>
                            {liked ? <LikeIconFilled className='likeIconFilled' /> : <LikeIconEmpty className='likeIcon' />}
                        </IconButton>
                        <Typography variant='body1' className='likes'>
                            {abbreviate(likes, 2, false, false)}
                        </Typography>
                    </div>
                </div>
            </Stack>
        </div>
    );
};

export default Comment;
