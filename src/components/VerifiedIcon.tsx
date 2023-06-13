import React from 'react';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';

const VerifiedIcon = (props: { className?: string }) => (
    <>
        <svg width={0} height={0}>
            <linearGradient id='linearColors' x1={1} y1={0} x2={0} y2={0}>
                <stop offset={0} stopColor='#12c2e9' />
                <stop offset={0.5} stopColor='#c471ed' />
                <stop offset={1} stopColor='#f64f59' />
            </linearGradient>
        </svg>
        <VerifiedRoundedIcon className={props.className ? props.className : ''} sx={{ fill: 'url(#linearColors)' }} />
    </>
);

export default VerifiedIcon;
