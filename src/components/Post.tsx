import React, { useState, useContext, useEffect } from 'react';
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
import VerifiedIcon from './VerifiedIcon';
import { PostProps } from '../types';
import { IComment } from '../types';
import renderTextWithLinks from '../utils/textWithLinks';
import ErrorAlert from './Error';

const LikeIconEmpty = FavoriteBorderRoundedIcon;
const LikeIconFilled = FavoriteRoundedIcon;
const CommentIcon = ChatBubbleOutlineRoundedIcon;

const Post: React.FC<PostProps> = (props: PostProps) => {
    const [liked, setLiked] = useState<boolean>(props.liked);
    const [likes, setLikes] = useState<number>(props.likes);
    const [comments, setComments] = useState<IComment[]>([]);
    const [page, setPage] = useState<number>(1);
    const [commentsOpen, setCommentsOpen] = useState<boolean>(false);
    const [writingComment, setWritingComment] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setPage(1);
    }, []);

    const handleLike = async () => {
        try {
            const res = await authAxios.post(`/posts/like/${props._id}`);
            if (res.data.message === 'Post liked') {
                setLiked(true);
                setLikes(likes + 1);
            } else if (res.data.message === 'Post unliked') {
                setLiked(false);
                setLikes(likes - 1);
            }
        } catch (err: any) {
            setError(err.response.data.message);
            throw new Error(err);
        }
    };

    const { userInfo } = useContext(AuthContext);

    const getComments = async () => {
        try {
            const res = await authAxios.get(`/posts/comments/${props._id}?page=${page}`);
            setComments((prev) => prev.concat(res.data.comments));
            if (res.data.comments.length === 0) {
                setWritingComment(true);
            }
            setPage((prev) => prev + 1);
        } catch (err: any) {
            setError(err.response.data.message);
            throw new Error(err);
        }
    };

    const closeComments = () => {
        setComments([]);
        setPage(1);
    };

    const handleShowComments = async () => {
        if (!commentsOpen) {
            await getComments();
        } else {
            closeComments();
        }
        setCommentsOpen((prev) => !prev);
    };

    const handleCommentInputClose = (comment?: { content: string; id: string; author: string; authorUsername: string; authorVerified: boolean }) => {
        setWritingComment(false);
        if (comment?.content && comment?.id) {
            setComments((prev) => [
                {
                    _id: comment.id,
                    author: comment.author,
                    authorUsername: comment.authorUsername,
                    content: comment.content,
                    likes: [],
                    liked: false,
                    authorVerified: comment.authorVerified
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
                        <Link aria-label='linkToProfilePage' variant='h6' className='username' href={`/profile/${props.authorUsername}`}>
                            {props.authorUsername} {props.authorVerified && <VerifiedIcon className='verifiedIcon' />}
                        </Link>
                    </div>
                    <div className='postContent'>
                        <Typography variant='body1' component='pre' className='content'>
                            {renderTextWithLinks(props.content)}
                        </Typography>
                    </div>
                    <div className='postFooter'>
                        <div className='buttonsContainer'>
                            <IconButton aria-label='likeBtn' className='likeButton' onClick={handleLike}>
                                {liked ? <LikeIconFilled className='likeIconFilled' /> : <LikeIconEmpty className='likeIcon' />}
                            </IconButton>
                            <Typography variant='body1' className='likes'>
                                {abbreviate(likes, 2, false, false)}
                            </Typography>
                            <IconButton aria-label='commentBtn' className='commentButton' onClick={handleShowComments}>
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
                                {comments.map(({ _id, author, authorUsername, content, likes, liked, authorVerified }) => {
                                    return (
                                        <Comment
                                            key={_id}
                                            _id={_id}
                                            author={author}
                                            authorUsername={authorUsername}
                                            content={content}
                                            likes={likes.length}
                                            liked={liked}
                                            authorVerified={authorVerified}
                                        />
                                    );
                                })}
                                {comments.length < props.comments.length && (
                                    <Link aria-label='showMoreCommentsLink' className='showMoreComments' onClick={getComments}>
                                        Show more comments
                                    </Link>
                                )}
                                {comments.length > 0 && <div className='spacer1' />}
                            </div>
                        )}
                    </div>
                </Stack>
            </Paper>
            {writingComment && <InputModal type='comment' postId={props._id} close={handleCommentInputClose} userInfo={userInfo} postAuthor={props.authorUsername} />}
            {error && <ErrorAlert message={error} close={() => setError('')} />}
        </div>
    );
};

export default Post;
