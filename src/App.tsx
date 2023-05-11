import React from 'react';
import './style/App.scss';
import './style/theme.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/404Page';
import PasswordForgottenPage from './pages/PasswordForgottenPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { RequireAuth } from 'react-auth-kit';

function App() {
    return (
        <div className='App'>
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
        </div>
    );
}

export default App;
