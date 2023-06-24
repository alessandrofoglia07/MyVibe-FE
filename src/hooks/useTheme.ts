import { useEffect, useState } from 'react';

const useTheme = () => {

    const [themeColor, setThemeColor] = useState<'#27262c' | '#f5f5f5'>(localStorage.getItem('theme') === 'dark' ? '#27262c' : '#f5f5f5');

    const setTheme = () => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            setThemeColor('#27262c');
        } else if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            setThemeColor('#f5f5f5');
        } else {
            // If no theme is set, check for user preference
            if (window.matchMedia('(prefers-color-scheme: dark').matches) {
                localStorage.setItem('theme', 'dark');
                document.documentElement.setAttribute('data-theme', 'dark');
                setThemeColor('#27262c');
            } else {
                localStorage.setItem('theme', 'light');
                document.documentElement.setAttribute('data-theme', 'light');
                setThemeColor('#f5f5f5');
            }
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
        setThemeColor(theme === 'dark' ? '#27262c' : '#f5f5f5');
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

    return { toggleTheme, toggleThemeTo, themeColor };
};

export default useTheme;