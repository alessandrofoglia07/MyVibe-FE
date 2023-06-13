import React, { useState } from 'react';
import '../style/Comment.scss';
import { Stack, Typography, IconButton, Link } from '@mui/material';
import LikeIconEmpty from '@mui/icons-material/FavoriteBorderRounded';
import LikeIconFilled from '@mui/icons-material/FavoriteRounded';
import abbreviate from '../utils/abbreviateNumber';
import authAxios from '../api/authAxiosApi';
import Pfp from './Pfp';
import { renderTextWithLinks } from './Post';
import VerifiedIcon from './VerifiedIcon';

interface IProps {
    _id: string;
    author: string;
    authorUsername: string;
    content: string;
    likes: number;
    liked: boolean;
    authorVerified: boolean;
}

const Comment: React.FC<IProps> = (props: IProps) => {
    const [liked, setLiked] = useState<boolean>(props.liked);
    const [likes, setLikes] = useState<number>(props.likes);

    const handleLike = async () => {
        try {
            const res = await authAxios.post(`/posts/comments/like/${props._id}`);
            if (res.data.message === 'Comment liked') {
                setLiked(true);
                setLikes(likes + 1);
            } else if (res.data.message === 'Comment unliked') {
                setLiked(false);
                setLikes(likes - 1);
            }
        } catch (err: any) {
            throw new Error(err);
        }
    };

    return (
        <div id='Comment'>
            <Stack spacing={2} className='commentContainer'>
                {window.innerWidth > 768 && <Pfp type='Comment' username={props.authorUsername} />}
                <div className='commentMain'>
                    <Link variant='h6' className='username' href={`/profile/${props.authorUsername}`}>
                        {props.authorUsername} {props.authorVerified && <VerifiedIcon className='verifiedIcon' />}
                    </Link>
                    <Typography variant='body1' className='content'>
                        {renderTextWithLinks(props.content)}
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
