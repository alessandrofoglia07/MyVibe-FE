import React from 'react';
import '../style/PostInput.scss';
import { Paper, Stack, Avatar } from '@mui/material';
import Button from '@mui/base/Button';

const PostInput = (props: { onClick: () => void }) => {
    const handleClick = () => {
        props.onClick();
    };

    return (
        <div id='PostInput'>
            <Paper elevation={0} className='postInput'>
                <Stack display='flex' flexDirection='row' justifyContent='start' alignItems='center' width='100%'>
                    {window.innerWidth > 768 && <Avatar className='avatar' />}
                    <Button className='button' onClick={handleClick}>
                        What vibes are you on?
                    </Button>
                </Stack>
            </Paper>
        </div>
    );
};

export default PostInput;
