import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, Avatar, Button } from '@mui/material';
import Input from '@mui/base/Input';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import authAxios from '../api/authAxiosApi';

const CloseIcon = CloseOutlinedIcon;

interface IProps {
    type: 'post' | 'comment';
    close: (commentInfo?: { content: string; id: string; author: string; authorUsername: string }) => void;
    userInfo: any;
    postId?: string;
}

const InputModal: React.FC<IProps> = ({ type, close, userInfo, postId }: IProps) => {
    const [content, setContent] = useState('');
    const url = type === 'post' ? '/posts/create' : `/posts/comments/create/${postId}`;

    const handleClose = () => {
        close();
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newContent = e.target.value;
        if (newContent.length >= 500) {
            newContent = newContent.slice(0, 500);
        }
        setContent(newContent);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await authAxios.post(url, { content });
        if (res.data.message === 'Post created') {
            setContent('');
            close();
        } else if (res.data.message === 'Comment created') {
            setContent('');
            const comment = res.data.comment;
            close({ content: comment.content, id: comment._id, author: comment.author, authorUsername: comment.authorUsername });
        } else {
            throw new Error(res.data.message);
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
                        <Avatar className='avatar' />
                        <Typography variant='h6' className='username'>
                            {userInfo?.username}
                        </Typography>
                    </div>
                    <form autoComplete='off' onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                        <Input id='input' value={content} onChange={handleContentChange} className='input' multiline placeholder='What is on your mind?' />
                        <Typography variant='body2' className='charCount'>
                            {content.length}/500
                        </Typography>
                        <Button type='submit' className='publishButton'>
                            Publish
                        </Button>
                    </form>
                </main>
            </Box>
        </Modal>
    );
};

export default InputModal;
