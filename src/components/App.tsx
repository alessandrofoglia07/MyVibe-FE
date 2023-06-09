import React from 'react';
import '../style/App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';
import PrivateRoutes from './ProtectedRoute';
import MainPage from '../pages/MainPage';
import SignUpPage from '../pages/SignUpPage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/404Page';
import PasswordForgottenPage from '../pages/PasswordForgottenPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';
import HashtagPage from '../pages/HashtagPage';
import VerifyAccountPage from '../pages/VerifyAccountPage';
import FollowersPage from '../pages/FollowersPage';
import FollowingPage from '../pages/FollowingPage';
import PostPage from '../pages/PostPage';

export const socket = io('ws://localhost:5000', {
    query: {
        userID: JSON.parse(localStorage.getItem('user_info') as string)?.userId
    }
});

const App: React.FC<any> = () => {
    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/profile/:username' element={<ProfilePage />} />
                        <Route path='/profile/:username/followers' element={<FollowersPage />} />
                        <Route path='/profile/:username/following' element={<FollowingPage />} />
                        <Route path='/profile/edit' element={<SettingsPage />} />
                        <Route path='/hashtag/:hashtag' element={<HashtagPage />} />
                        <Route path='/post/:id' element={<PostPage />} />
                    </Route>
                    <Route path='/verifyAccount/:verificationCode' element={<VerifyAccountPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/sign-up' element={<SignUpPage />} />
                    <Route path='/password-forgotten' element={<PasswordForgottenPage />} />
                    <Route path='/resetPassword/:id' element={<ResetPasswordPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
