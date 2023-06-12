import React, { useState, useEffect, useContext } from 'react';
import '../style/Navbar.scss';
import { AppBar, Toolbar, Typography, TextField, Avatar, Button, IconButton, Badge, Link, Modal, Box } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import useTheme from '../hooks/useTheme';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { AuthContext } from '../context/AuthContext';
import authAxios from '../api/authAxiosApi';
import FollowingLink from './followingLink';
import { IUser } from '../pages/ProfilePage';

const NotificationIcon = NotificationsNoneRoundedIcon;
const LightModeIcon = WbSunnyOutlinedIcon;
const DarkModeIcon = DarkModeOutlinedIcon;

const Navbar: React.FC<any> = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [mobileSearchbarOpen, setMobileSearchbarOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [pfpUrl, setPfpUrl] = useState<string>('');
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchResults, setSearchResults] = useState<IUser[]>([]);
    const [searchResultsOpen, setSearchResultsOpen] = useState<boolean>(false);
    const [searchResultsPreviewOpen, setSearchResultsPreviewOpen] = useState<boolean>(false);
    const [usersCount, setUsersCount] = useState<number>(0);
    const [page, setPage] = useState<number>(1);

    const { toggleTheme } = useTheme();

    const { userInfo } = useContext(AuthContext);

    useEffect(() => {
        (async () => {
            if (userInfo) {
                const res = await authAxios(`/users/pfp/${userInfo.username}`, { responseType: 'blob' });
                setPfpUrl(URL.createObjectURL(res.data));
            }
        })();
    }, []);

    const handleThemeChange = () => {
        toggleTheme();
        setTheme(localStorage.getItem('theme') || 'light');
    };

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        });
    }, []);

    useEffect(() => {
        if (width >= 768) {
            setMobileSearchbarOpen(false);
        }
    }, [width]);

    const handleFocus = () => {
        const searchBar = document.getElementsByClassName('searchBar')[0];

        const addFocusClass = () => {
            searchBar?.classList.add('searchBarFocused');
            searchBar?.addEventListener('focusout', handleFocusOut);
        };

        const handleFocusOut = () => {
            setTimeout(() => {
                setSearchResultsPreviewOpen(false);
                searchBar?.classList.remove('searchBarFocused');
                searchBar?.classList.add('searchBarUnfocused');
                setTimeout(() => {
                    searchBar?.classList.remove('searchBarUnfocused');
                }, 500);
            }, 100);
        };

        const removeFocusClass = () => {
            searchBar?.classList.remove('searchBarFocused');
            searchBar?.removeEventListener('focusout', handleFocusOut);
        };

        const handleResize = () => {
            const width = window.innerWidth || document.documentElement.clientWidth;
            if (width > 768) {
                addFocusClass();
            } else {
                removeFocusClass();
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            removeFocusClass();
        };
    };

    const handleSearchbarOpen = () => {
        setMobileSearchbarOpen(true);

        setTimeout(() => {
            const searchBar = document.getElementById('searchBar');

            if (searchBar) {
                searchBar.focus();
                searchBar.addEventListener('focusout', handleSearchbarClose);
            }
        }, 50);
    };

    const handleSearchbarClose = () => {
        const searchBar = document.getElementById('searchBar');
        setSearchResultsPreviewOpen(false);

        if (searchBar) {
            searchBar.removeEventListener('focusout', handleSearchbarClose);
            searchBar.classList.remove('searchBarMobileShow');
            setMobileSearchbarOpen(false);
        }
    };

    const logoClassnames = width > 768 ? 'myVibe' : 'myVibe smallerMyVibe';

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        const res = await authAxios(`/users/search?search=${value}&limit=10`);
        setSearchResults(res.data.users);
        setSearchResultsPreviewOpen(true);
        setUsersCount(res.data.usersCount);
    };

    const handleSearchMore = async () => {
        const res = await authAxios(`/users/search?search=${searchValue}&limit=10&page=${page + 1}`);
        setSearchResults([...searchResults, ...res.data.users]);
        setPage(page + 1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setSearchResultsOpen(true);
            setSearchResultsPreviewOpen(false);
            setSearchValue('');
        }
    };

    const handleModalClose = () => {
        setSearchResultsOpen(false);
        setPage(1);
    };

    return (
        <>
            <AppBar position='static' id='navbar' className='navbar'>
                <Toolbar className='toolbar' sx={{ justifyContent: mobileSearchbarOpen ? 'center' : 'space-between' }}>
                    {!mobileSearchbarOpen && (
                        <div id='logo'>
                            <Link underline='none' href='/'>
                                <Typography className={logoClassnames}>myvibe.</Typography>
                            </Link>
                        </div>
                    )}

                    {width > 768 ? (
                        // Desktop navbar
                        <>
                            <TextField
                                InputProps={{
                                    startAdornment: <SearchRoundedIcon fontSize='small' sx={{ mr: '5px' }} />
                                }}
                                id='searchBar'
                                value={searchValue}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                placeholder='Search'
                                autoComplete='off'
                                onKeyDown={handleKeyDown}
                                variant='outlined'
                                className='searchBar'
                            />
                            <div id='buttons' className='buttonsContainer'>
                                <IconButton className='themeBtn' onClick={handleThemeChange}>
                                    {theme === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
                                </IconButton>
                                <IconButton className='notificationBtn'>
                                    <Badge badgeContent={1} color='error' variant='dot'>
                                        <NotificationIcon />
                                    </Badge>
                                </IconButton>
                                <Button className='avatarContainer' disableRipple href={`/profile/${userInfo?.username}`}>
                                    <Avatar className='avatar' src={pfpUrl} alt='pfp'>
                                        <PersonIcon />
                                    </Avatar>
                                </Button>
                            </div>
                        </>
                    ) : (
                        // Mobile navbar
                        <>
                            {mobileSearchbarOpen ? (
                                <TextField
                                    id='searchBar'
                                    placeholder='Search'
                                    variant='outlined'
                                    value={searchValue}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    className='searchBarMobile searchBarMobileShow'
                                    autoComplete='off'
                                    InputProps={{
                                        startAdornment: <SearchRoundedIcon fontSize='small' sx={{ mr: '5px' }} />
                                    }}
                                />
                            ) : (
                                <div id='buttons' className='buttonsContainer'>
                                    <IconButton className='searchBtn' onClick={handleSearchbarOpen}>
                                        <SearchRoundedIcon />
                                    </IconButton>
                                    <IconButton className='notificationBtn'>
                                        <Badge badgeContent={1} color='error' variant='dot'>
                                            <NotificationIcon />
                                        </Badge>
                                    </IconButton>
                                    <Button className='avatarContainer' disableRipple href={`/profile/${userInfo?.username}`}>
                                        <Avatar className='avatar' src={pfpUrl} alt='pfp'>
                                            <PersonIcon />
                                        </Avatar>
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <div className='navbarSpacer' />
            {/* TODO: Finish this */}
            <Modal open={searchResultsOpen} onClose={handleModalClose}>
                <Box className='searchResultsContainer'>
                    <Typography className='searchResultsTitle'>
                        <SearchRoundedIcon className='icon' />
                        <strong>Search Result</strong>
                    </Typography>
                    {searchResults.length === 0 && <Typography className='noMatchesText'>No matches</Typography>}
                    {searchResults.map((user) => (
                        <FollowingLink key={user._id} username={user.username} />
                    ))}
                    {usersCount > searchResults.length && (
                        <Link onClick={handleSearchMore} className='searchMoreLink'>
                            Search more
                        </Link>
                    )}
                </Box>
            </Modal>
            {searchResultsPreviewOpen && (
                <Box className='searchResultsPreview'>
                    {searchResults.length === 0 && <Typography className='noMatchesText'>No matches</Typography>}
                    {searchResults.slice(0, 3).map((user) => (
                        <FollowingLink key={user._id} username={user.username} />
                    ))}
                </Box>
            )}
        </>
    );
};

export default Navbar;
