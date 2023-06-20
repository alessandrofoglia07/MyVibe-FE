import React from 'react';
import { Link } from '@mui/material';

const renderTextWithLinks = (text: string, type?: 'Normal' | 'Notification'): React.ReactNode => {
    if (type === 'Normal' || type === undefined) {
        const usernameRegex = /@(\w+)/g;
        const hashtagRegex = /#(\w+)/g;
        const urlRegex = /(https?:\/\/[^\s]+)/g;

        const combinedRegex = /(@\w+|#\w+|https?:\/\/[^\s]+)/g;

        const splitText = text.split(combinedRegex).filter(Boolean);

        return splitText.map((segment: string, idx: number) => {
            if (usernameRegex.test(segment)) {
                return (
                    <Link key={idx} className='mention' href={`/profile/${segment.substring(1)}`}>
                        {segment}
                    </Link>
                );
            } else if (hashtagRegex.test(segment)) {
                return (
                    <Link key={idx} className='hashtag' href={`/hashtag/${segment.substring(1)}`}>
                        {segment}
                    </Link>
                );
            } else if (urlRegex.test(segment)) {
                if (segment.endsWith('/')) {
                    segment = segment.substring(0, segment.length - 1);
                }
                return (
                    <Link key={idx} className='url' href={segment}>
                        {segment}
                    </Link>
                );
            } else {
                return <span key={idx}>{segment}</span>;
            }
        });
    } else if (type === 'Notification') {
        const usernameRegex = /@(\w+)/g;
        const urlRegex = /\[(comment|post)]\s*(\w+)/g;

        const combinedRegex = /(@\w+|\[(comment|post)\]\s*\w+)/g;

        const splitText = text.split(combinedRegex).filter(Boolean);

        return splitText.map((segment: string, idx: number) => {
            if (usernameRegex.test(segment)) {
                return (
                    <Link key={idx} className='mention' href={`/profile/${segment.substring(1)}`}>
                        {segment}
                    </Link>
                );
            } else if (urlRegex.test(segment)) {
                const text = segment.slice(1, segment.lastIndexOf(']'));
                const id = segment.slice(segment.lastIndexOf(']') + 1, segment.length);
                return (
                    <Link key={idx} className='url' href={`/post/${id}`}>
                        {text}
                    </Link>
                );
            } else {
                if (segment === 'comment' || segment === 'post') return;
                return <span key={idx}>{segment}</span>;
            }
        });
    }
};

export default renderTextWithLinks;
