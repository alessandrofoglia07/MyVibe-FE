import React from 'react';
import '../style/ProfilePage.scss';
import Navbar from '../components/navbar';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { username } = useParams<{ username: string }>();

    return (
        <div id='ProfilePage'>
            <Navbar />
            <h1>ProfilePage</h1>
        </div>
    );
};

export default ProfilePage;
