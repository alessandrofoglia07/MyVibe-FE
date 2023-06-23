import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { StyledEngineProvider } from '@mui/material/styles';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <AuthProvider>
        <StyledEngineProvider injectFirst>
            <App />
        </StyledEngineProvider>
    </AuthProvider>
);
