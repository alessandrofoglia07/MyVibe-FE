import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
import Input from '@mui/base/Input';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import authAxios from '../api/authAxiosApi';
import Pfp from './Pfp';

const CloseIcon = CloseOutlinedIcon;

interface IProps {
    type: 'post' | 'comment';
    close: (commentInfo?: { content: string; id: string; author: string; authorUsername: string; authorVerified: boolean }) => void;
    userInfo: any;
    postId?: string;
    postAuthor?: string;
}

const InputModal: React.FC<IProps> = ({ type, close, userInfo, postId, postAuthor }: IProps) => {
    const [content, setContent] = useState('');
    const url = type === 'post' ? '/posts/create' : `/posts/comments/create/${postId}`;

    useEffect(() => {
        if (postAuthor) {
            setContent((content) => `@${postAuthor} ${content}`);
        }
    }, []);

    const handleClose = () => {
        close();
    };

    const maxContentLength = type === 'post' ? 500 : 300;

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newContent = e.target.value;
        if (newContent.length >= maxContentLength) {
            newContent = newContent.slice(0, maxContentLength);
        }
        setContent(newContent);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await authAxios.post(url, { content });
            if (res.data.message === 'Post created') {
                setContent('');
                close();
            } else if (res.data.message === 'Comment created') {
                setContent('');
                const comment = res.data.comment;
                close({ content: comment.content, id: comment._id, author: comment.author, authorUsername: comment.authorUsername, authorVerified: comment.authorVerified });
            } else {
                throw new Error(res.data.message);
            }
        } catch (err: any) {
            throw new Error(err);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.ctrlKey && e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <Modal open onClose={handleClose}>
            <Box className='postModal'>
                <header>
                    <div className='headerLeft' />
                    <Typography variant='h6' className='title'>
                        Write a {type}.
                    </Typography>
                    <IconButton className='closeButton' onClick={handleClose} disableRipple>
                        <CloseIcon />
                    </IconButton>
                </header>
                <main>
                    <div className='top'>
                        <Pfp username={userInfo?.username} type='Post' unclickable />
                        <Typography variant='h6' className='username'>
                            {userInfo?.username}
                        </Typography>
                    </div>
                    <form autoComplete='off' onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                        <Input id='input' value={content} onChange={handleContentChange} className='input' autoFocus multiline placeholder='What is on your mind?' />
                        <Typography variant='body2' className='charCount'>
                            {content.length}/{maxContentLength}
                        </Typography>
                        <Button disabled={content.length <= 10} type='submit' className='publishButton'>
                            Publish
                        </Button>
                    </form>
                </main>
            </Box>
        </Modal>
    );
};

export default InputModal;
