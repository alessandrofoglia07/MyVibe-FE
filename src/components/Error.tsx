import React from 'react';
import '../style/Error.scss';
import { Typography, IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface IProps {
    message: string;
    close: () => void;
}

const Close = CloseRoundedIcon;

const ErrorAlert: React.FC<IProps> = ({ message, close }: IProps) => {
    return (
        <div id='Error' className='errorBorder'>
            <div className='errorContainer'>
                <Typography className='errorMessage'>{message}</Typography>
                <IconButton className='errorCloseBtn' aria-label='closeErrorMessage' onClick={close}>
                    <Close />
                </IconButton>
            </div>
        </div>
    );
};

export default ErrorAlert;
