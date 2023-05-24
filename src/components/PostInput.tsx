import React from 'react';
import '../style/PostInput.scss';
import { Paper, Stack, Typography, Avatar } from '@mui/material';
import Button from '@mui/base/Button';

const PostInput = () => {
    const handleClick = () => {
        console.log('clicked');
    };

    return (
        <div id='PostInput'>
            <Paper elevation={0} className='postInput'>
                <Stack display='flex' flexDirection='row' justifyContent='start' alignItems='center' width='100%'>
                    <Avatar className='avatar' />
                    <Button className='button' onClick={handleClick}>
                        What vibes are you on?
                    </Button>
                </Stack>
            </Paper>
        </div>
    );
};

export default PostInput;
