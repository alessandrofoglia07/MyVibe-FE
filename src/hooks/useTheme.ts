import { useEffect } from 'react';

const useTheme = () => {

    const setTheme = () => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            // default to light theme
            localStorage.setItem('theme', 'light');
            document.documentElement.setAttribute('data-theme', 'light');
        }
    };

    useEffect(() => {
        window.addEventListener('storage', setTheme);
        setTheme();
        return () => window.removeEventListener('storage', setTheme);
    }, []);

    const toggleThemeTo = (theme: 'dark' | 'light') => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    };

    const toggleTheme = () => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            toggleThemeTo('light');
        } else if (theme === 'light') {
            toggleThemeTo('dark');
        } else {
            toggleThemeTo('dark');
        }
    };

    return { toggleTheme, toggleThemeTo };
};

export default useTheme;