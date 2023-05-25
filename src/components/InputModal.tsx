import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, Avatar, Button } from '@mui/material';
import Input from '@mui/base/Input';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const CloseIcon = CloseOutlinedIcon;

interface IProps {
    close: () => void;
    userInfo: any;
}

const InputModal = (props: IProps) => {
    const [content, setContent] = useState('');

    const handleClose = () => {
        props.close();
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newContent = e.target.value;
        if (newContent.length >= 500) {
            newContent = newContent.slice(0, 500);
        }
        setContent(newContent);
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
                            {props.userInfo?.username}
                        </Typography>
                    </div>
                    <Input value={content} onChange={handleContentChange} className='input' multiline placeholder='What is on your mind?' />
                    <Typography variant='body2' className='charCount'>
                        {content.length}/500
                    </Typography>
                    <Button className='publishButton'>Publish</Button>
                </main>
            </Box>
        </Modal>
    );
};

export default InputModal;
