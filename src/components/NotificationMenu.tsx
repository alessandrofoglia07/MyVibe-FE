import React from 'react';
import '../style/NotificationMenu.scss';
import { Paper, Typography } from '@mui/material';
import Pfp from './Pfp';

// todo: add notification types
interface IProps {
    notifications: any;
}

const NotificationMenu: React.FC<IProps> = ({ notifications }: IProps) => {
    return (
        <div id='NotificationMenu'>
            <Paper elevation={8} className='paper'>
                <Typography className='title'>Notifications.</Typography>
                <div className='notificationsContainer'>
                    {notifications.map((notification: any) => (
                        <div className='notification' key={Math.random() * 10000 + Math.random() * Math.random() * 100}>
                            <Pfp username={notification.author} type='Notification' />
                            <Typography className='notificationContent'>{notification.content}</Typography>
                        </div>
                    ))}
                </div>
            </Paper>
        </div>
    );
};

export default NotificationMenu;
