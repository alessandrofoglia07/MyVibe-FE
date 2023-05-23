import React, { useState } from 'react';
import { Paper, Stack, Typography, Avatar, IconButton, Link } from '@mui/material';
import '../style/Post.scss';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import abbreviate from '../api/abbreviateNumber';
import authAxios from '../api/authAxiosApi';

const LikeIconEmpty = FavoriteBorderRoundedIcon;
const LikeIconFilled = FavoriteRoundedIcon;
const CommentIcon = ChatBubbleOutlineRoundedIcon;

export interface postProps {
    _id: string;
    author: string;
    authorUsername: string;
    content: string;
    date: string;
    likes: number;
    comments: number;
    liked: boolean;
}

const Post = (props: postProps) => {
    const [liked, setLiked] = useState<boolean>(props.liked);
    const [likes, setLikes] = useState<number>(props.likes);

    const handleLike = async () => {
        const res = await authAxios.post(`/posts/like/${props._id}`);
        if (res.data.message === 'Post liked') {
            setLiked(true);
            setLikes(likes + 1);
        } else if (res.data.message === 'Post unliked') {
            setLiked(false);
            setLikes(likes - 1);
        }
    };

    return (
        <div id='Post'>
            <Paper elevation={0} className='post'>
                <Stack spacing={2}>
                    <div className='postHeader'>
                        <Avatar className='avatar' />
                        <Link variant='h6' className='username' href={`/profile/${props.authorUsername}`}>
                            {props.authorUsername}
                        </Link>
                    </div>
                    <div className='postContent'>
                        <Typography variant='body1' className='content'>
                            {props.content}
                        </Typography>
                    </div>
                    <div className='postFooter'>
                        <IconButton className='likeButton' onClick={handleLike}>
                            {liked ? <LikeIconFilled className='likeIconFilled' /> : <LikeIconEmpty className='likeIcon' />}
                        </IconButton>
                        <Typography variant='body1' className='likes'>
                            {abbreviate(likes, 2, false, false)}
                        </Typography>
                        <IconButton className='commentButton'>
                            <CommentIcon className='commentIcon' />
                        </IconButton>
                        <Typography variant='body1' className='comments'>
                            {abbreviate(props.comments, 2, false, false)}
                        </Typography>
                    </div>
                </Stack>
            </Paper>
        </div>
    );
};

export default Post;
