import React from 'react';
import '../style/NotificationMenu.scss';
import { Paper, Typography } from '@mui/material';
import renderTextWithLinks from '../utils/textWithLinks';

interface IProps {
    notifications: string[];
}

const NotificationMenu: React.FC<IProps> = ({ notifications }: IProps) => {
    return (
        <div id='NotificationMenu'>
            <Paper elevation={8} className='paper'>
                <Typography className='title'>Notifications.</Typography>
                <div className='notificationsContainer'>
                    {notifications.reverse().map((notification: string) => (
                        <div className='notification' key={Math.random() * 10000 + Math.random() * Math.random() * 100}>
                            <Typography className='notificationContent'>
                                <b>{renderTextWithLinks(notification, 'Notification')}</b>
                            </Typography>
                            <div className='notificationDivider' />
                        </div>
                    ))}
                </div>
            </Paper>
        </div>
    );
};

export default NotificationMenu;
