import React from 'react';
import { Paper, Stack, Typography, Avatar, IconButton, Link } from '@mui/material';
import '../style/Post.scss';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import abbreviate from '../api/abbreviateNumber';

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
                        <IconButton className='likeButton'>{props.liked ? <LikeIconFilled className='likeIconFilled' /> : <LikeIconEmpty className='likeIcon' />}</IconButton>
                        <Typography variant='body1' className='likes'>
                            {abbreviate(props.likes, 2, false, false)}
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
