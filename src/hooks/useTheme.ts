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