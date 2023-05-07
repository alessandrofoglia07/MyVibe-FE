import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <div className='App'>
            <StyledEngineProvider injectFirst>
                <Router>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/sign-up' element={<SignUpPage />} />
                        <Route path='*' element={<h1>404</h1>} />
                    </Routes>
                </Router>
            </StyledEngineProvider>
        </div>
    );
}

export default App;
