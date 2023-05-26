import React, { useState, useEffect } from 'react';
import '../style/ProfilePage.scss';
import Navbar from '../components/navbar';
import { useParams } from 'react-router-dom';
import authAxios from '../api/authAxiosApi';

const ProfilePage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { username } = useParams<{ username: string }>();
    const [user, setUser] = useState<any>(null);
    console.log(user);

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const res = await authAxios.get(`/users/profile/${username}`);
            setUser(res.data.user);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div id='ProfilePage'>
            <Navbar />
            <h1>ProfilePage</h1>
        </div>
    );
};

export default ProfilePage;
