import React, { useState, useContext } from 'react';
import { Paper, Stack, Typography, IconButton, Link, Button } from '@mui/material';
import '../style/Post.scss';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import abbreviate from '../utils/abbreviateNumber';
import authAxios from '../api/authAxiosApi';
import Comment from './Comment';
import InputModal from './InputModal';
import { AuthContext } from '../context/AuthContext';
import Pfp from './Pfp';

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
    comments: string[];
    liked: boolean;
}

interface IComment {
    _id: string;
    author: string;
    authorUsername: string;
    content: string;
    likes: string[];
    liked: boolean;
}

const renderTextWithLinks = (text: string) => {
    const usernameRegex = /@(\w+)/g;
    const hashtagRegex = /#(\w+)/g;
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const combinedRegex = /(@(\w+)|#(\w+)|(https?:\/\/[^\s]+))/g;

    const splitText = text.split(combinedRegex).filter(Boolean); // Remove empty strings

    return splitText.map((text, idx) => {
        if (usernameRegex.test(text)) {
            splitText.splice(idx + 1, 1);
            return (
                <Link key={idx} className='mention' href={`/profile/${text.substring(1)}`}>
                    {text}
                </Link>
            );
        } else if (hashtagRegex.test(text)) {
            splitText.splice(idx + 1, 1);
            return (
                <Link key={idx} className='hashtag' href={`/hashtag/${text.substring(1)}`}>
                    {text}
                </Link>
            );
        } else if (urlRegex.test(text)) {
            splitText.splice(idx + 1, 1);
            return (
                <Link key={idx} className='url' href={text}>
                    {text}
                </Link>
            );
        } else {
            return <span key={idx}>{text}</span>;
        }
    });
};

const Post: React.FC<postProps> = (props: postProps) => {
    const [liked, setLiked] = useState<boolean>(props.liked);
    const [likes, setLikes] = useState<number>(props.likes);
    const [comments, setComments] = useState<IComment[]>([]);
    const [page, setPage] = useState<number>(1);
    const [commentsOpen, setCommentsOpen] = useState<boolean>(false);
    const [writingComment, setWritingComment] = useState<boolean>(false);

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

    const { userInfo } = useContext(AuthContext);

    const getComments = async () => {
        const res = await authAxios.get(`/posts/comments/${props._id}?page=${page}`);
        setComments((prev) => prev.concat(res.data.comments));
        setPage((prev) => prev + 1);
    };

    const closeComments = () => {
        setComments([]);
        setPage(1);
    };

    const handleShowComments = () => {
        setCommentsOpen((prev) => !prev);
        if (comments.length === 0) {
            getComments();
        } else {
            closeComments();
        }
    };

    const handleCommentInputClose = (comment?: { content: string; id: string; author: string; authorUsername: string }) => {
        setWritingComment(false);
        if (comment?.content && comment?.id) {
            setComments((prev) => [
                {
                    _id: comment.id,
                    author: comment.author,
                    authorUsername: comment.authorUsername,
                    content: comment.content,
                    likes: [],
                    liked: false
                },
                ...prev
            ]);
        }
    };

    return (
        <div id='Post'>
            <Paper elevation={0} className='post'>
                <Stack spacing={2}>
                    <div className='postHeader'>
                        <Pfp type='Post' username={props.authorUsername} />
                        <Link variant='h6' className='username' href={`/profile/${props.authorUsername}`}>
                            {props.authorUsername}
                        </Link>
                    </div>
                    <div className='postContent'>
                        <Typography variant='body1' className='content'>
                            {renderTextWithLinks(props.content)}
                        </Typography>
                    </div>
                    <div className='postFooter'>
                        <div className='buttonsContainer'>
                            <IconButton className='likeButton' onClick={handleLike}>
                                {liked ? <LikeIconFilled className='likeIconFilled' /> : <LikeIconEmpty className='likeIcon' />}
                            </IconButton>
                            <Typography variant='body1' className='likes'>
                                {abbreviate(likes, 2, false, false)}
                            </Typography>
                            <IconButton className='commentButton' onClick={handleShowComments}>
                                <CommentIcon className='commentIcon' />
                            </IconButton>
                            <Typography variant='body1' className='comments'>
                                {abbreviate(props.comments.length, 2, false, false)}
                            </Typography>
                        </div>
                        {commentsOpen && (
                            <div className='commentsContainer'>
                                <Stack className='commentsInput'>
                                    <Button className='commentsInputButton' disableRipple onClick={() => setWritingComment(true)}>
                                        Something to say?
                                    </Button>
                                </Stack>
                                {comments.map(({ _id, author, authorUsername, content, likes, liked }) => {
                                    return <Comment key={_id} _id={_id} author={author} authorUsername={authorUsername} content={content} likes={likes.length} liked={liked} />;
                                })}
                                {comments.length !== props.comments.length && (
                                    <Link className='showMoreComments' onClick={getComments}>
                                        Show more comments
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </Stack>
            </Paper>
            {writingComment && <InputModal type='comment' postId={props._id} close={handleCommentInputClose} userInfo={userInfo} />}
        </div>
    );
};

export default Post;
