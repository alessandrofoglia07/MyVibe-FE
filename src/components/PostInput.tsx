import React, { useContext } from 'react';
import '../style/PostInput.scss';
import { Paper, Stack } from '@mui/material';
import Button from '@mui/base/Button';
import { AuthContext } from '../context/AuthContext';
import Pfp from './Pfp';

interface IProps {
    onClick: () => void;
}

const PostInput: React.FC<IProps> = ({ onClick }: IProps) => {
    const handleClick = () => {
        onClick();
    };

    const { userInfo } = useContext(AuthContext);

    return (
        <div id='PostInput'>
            <Paper elevation={0} className='postInput'>
                <Stack display='flex' flexDirection='row' justifyContent='start' alignItems='center' width='100%'>
                    {window.innerWidth > 768 && <Pfp username={userInfo?.username} type='PostInput' unclickable />}
                    <Button className='button' onClick={handleClick}>
                        What vibes are you on?
                    </Button>
                </Stack>
            </Paper>
        </div>
    );
};

export default PostInput;
