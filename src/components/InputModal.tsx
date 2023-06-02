import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, Avatar, Button } from '@mui/material';
import Input from '@mui/base/Input';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import authAxios from '../api/authAxiosApi';

const CloseIcon = CloseOutlinedIcon;

interface IProps {
    close: () => void;
    userInfo: any;
}

const InputModal = ({ close, userInfo }: IProps) => {
    const [content, setContent] = useState('');

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
        const res = await authAxios.post('/posts/create', { content });
        if (res.data.message === 'Post created') {
            setContent('');
            close();
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
                        Write a post.
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
