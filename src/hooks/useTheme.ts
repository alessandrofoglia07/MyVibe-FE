import { useEffect } from 'react';

const useTheme = () => {
    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, [localStorage.getItem('theme')]);

    const toggleTheme = () => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            localStorage.setItem('theme', 'light');
            document.documentElement.setAttribute('data-theme', 'light');
        } else if (theme === 'light') {
            localStorage.setItem('theme', 'dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    };

    return { toggleTheme };
};

export default useTheme;