import React from 'react';
import '../style/App.scss';
import '../style/theme.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoutes from './ProtectedRoute';
import MainPage from '../pages/MainPage';
import SignUpPage from '../pages/SignUpPage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/404Page';
import PasswordForgottenPage from '../pages/PasswordForgottenPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import ProfilePage from '../pages/ProfilePage';

const App = () => {
    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/profile/:id' element={<ProfilePage />} />
                    </Route>
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
