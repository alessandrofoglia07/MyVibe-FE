import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from './ProfilePage';
import authAxios from '../api/authAxiosApi';
import '../style/SettingsPage.scss';
import { UserInfo, getUserInfo } from '../api/authApi';
import Navbar from '../components/navbar';
import { CircularProgress, Typography, Button, TextField, Stack, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

const EditIcon = AutoAwesomeRoundedIcon;

const SettingsPage: React.FC<any> = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<IUser | null>(null);
    const [initUsername, setInitUsername] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [hoverPfp, setHoverPfp] = useState<boolean>(false);

    const { username } = getUserInfo() as UserInfo;

    useEffect(() => {
        (async () => {
            try {
                await getUserData();
            } catch (err: any) {
                navigate(`/profile/${username}`);
                throw new Error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const getUserData = async (): Promise<void> => {
        try {
            const res = await authAxios.get(`/users/profile/${username}`);
            if (res.data.isProfile === false) return Promise.reject('Access denied');
            setUser(res.data.user);
            setInitUsername(res.data.user.username);
        } catch (err: any) {
            throw new Error(err);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = e.target;
        if (id === 'username') {
            setUser((prev: any) => ({ ...prev, username: value }));
        } else {
            setUser((prev: any) => ({ ...prev, info: { ...prev.info, [id]: value } }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (user === null) return;

        try {
            await authAxios.patch(`/users/profile/${username}`, { user });
            navigate(`/profile/${user?.username}`);
        } catch (err: any) {
            throw new Error(err);
        }
    };

    return (
        <div id='SettingsPage'>
            <header>
                <Navbar />
            </header>
            <main>
                {loading ? (
                    <CircularProgress className='loading' />
                ) : (
                    <>
                        <Stack className='mainContainer'>
                            <Stack className='top'>
                                <Button className='avatarContainer' disableRipple onMouseEnter={() => setHoverPfp(true)} onMouseLeave={() => setHoverPfp(false)}>
                                    <Avatar className='avatar' src='/assets/pfp-placeholder.png' alt='pfp'>
                                        <PersonIcon className='personIcon' />
                                        {hoverPfp && (
                                            <div className='editIconContainer'>
                                                <EditIcon className='editIcon' />
                                            </div>
                                        )}
                                    </Avatar>
                                </Button>
                                <Typography variant='h3' className='unselectable'>
                                    <b>
                                        <i>Hello</i> {initUsername}
                                    </b>
                                </Typography>
                            </Stack>
                            <Stack className='center'>
                                <Typography variant='h3' className='editText unselectable'>
                                    <b>Edit your profile.</b>
                                </Typography>
                                <form autoComplete='off' className='fields' onSubmit={handleSubmit}>
                                    <div className='container'>
                                        <Typography component='h6' className='unselectable'>
                                            <b>Username</b>
                                        </Typography>
                                        <TextField className='input' value={user?.username} id='username' onChange={handleInputChange} />
                                    </div>
                                    <div className='container'>
                                        <Typography component='h6' className='unselectable'>
                                            <b>Bio</b>
                                        </Typography>
                                        <Stack>
                                            <TextField className='input' value={user?.info.bio} id='bio' multiline rows={4} onChange={handleInputChange} />
                                            <Typography component='p'>{user?.info.bio.length}/150</Typography>
                                        </Stack>
                                    </div>
                                    <div className='container'>
                                        <Typography component='h6' className='unselectable'>
                                            <b>First name</b>
                                        </Typography>
                                        <TextField className='input' value={user?.info.firstName} id='firstName' onChange={handleInputChange} />
                                    </div>
                                    <div className='container'>
                                        <Typography component='h6' className='unselectable'>
                                            <b>Last name</b>
                                        </Typography>
                                        <TextField className='input' value={user?.info.lastName} id='lastName' onChange={handleInputChange} />
                                    </div>
                                    <Button disableRipple variant='contained' className='submitBtn' type='submit'>
                                        Save Changes
                                    </Button>
                                </form>
                            </Stack>
                        </Stack>
                    </>
                )}
            </main>
        </div>
    );
};

export default SettingsPage;
