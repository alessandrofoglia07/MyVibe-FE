import React from 'react';
import './style/App.scss';
import './style/theme.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { AuthProvider } from './context/AuthContext';
import PrivateRoutes from './components/ProtectedRoute';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/404Page';
import PasswordForgottenPage from './pages/PasswordForgottenPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
    return (
        <AuthProvider>
            <StyledEngineProvider injectFirst>
                <div className='App'>
                    <Router>
                        <Routes>
                            <Route element={<PrivateRoutes />}>
                                <Route path='/' element={<MainPage />} />
                            </Route>
                            <Route path='/login' element={<LoginPage />} />
                            <Route path='/sign-up' element={<SignUpPage />} />
                            <Route path='/password-forgotten' element={<PasswordForgottenPage />} />
                            <Route path='/resetPassword/:id' element={<ResetPasswordPage />} />
                            <Route path='*' element={<NotFoundPage />} />
                        </Routes>
                    </Router>
                </div>
            </StyledEngineProvider>
        </AuthProvider>
    );
}

export default App;
