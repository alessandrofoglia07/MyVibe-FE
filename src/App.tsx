import React from 'react';
import './style/App.scss';
import './style/theme.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { AuthProvider, RequireAuth } from 'react-auth-kit';
import refreshApi from './api/refreshApi';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/404Page';
import PasswordForgottenPage from './pages/PasswordForgottenPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
    return (
        <div className='App'>
            <AuthProvider authType='cookie' authName='auth' cookieDomain={window.location.hostname} cookieSecure={false} refresh={refreshApi}>
                <StyledEngineProvider injectFirst>
                    <Router>
                        <Routes>
                            <Route
                                path='/'
                                element={
                                    <RequireAuth loginPath='/login'>
                                        <MainPage />
                                    </RequireAuth>
                                }
                            />
                            <Route path='/login' element={<LoginPage />} />
                            <Route path='/sign-up' element={<SignUpPage />} />
                            <Route path='/password-forgotten' element={<PasswordForgottenPage />} />
                            <Route path='/resetPassword/:id' element={<ResetPasswordPage />} />
                            <Route path='*' element={<NotFoundPage />} />
                        </Routes>
                    </Router>
                </StyledEngineProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
