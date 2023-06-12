import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from './ProfilePage';
import authAxios from '../api/authAxiosApi';
import '../style/SettingsPage.scss';
import { UserInfo, getUserInfo } from '../api/authApi';
import Navbar from '../components/navbar';
import { Typography, Button, TextField, Stack, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import Loading from '../components/Loading';
import useTheme from '../hooks/useTheme';

const EditIcon = AutoAwesomeRoundedIcon;

const SettingsPage: React.FC<any> = () => {
    const navigate = useNavigate();
    useTheme();

    const [user, setUser] = useState<IUser | null>(null);
    const [initUsername, setInitUsername] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [hoverPfp, setHoverPfp] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewSource, setPreviewSource] = useState<string>('');
    const [initImageUrl, setInitImageUrl] = useState<string>('');

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

            const res2 = await authAxios.get(`/users/pfp/${res.data.user.username}`, { responseType: 'blob' });
            setInitImageUrl(URL.createObjectURL(res2.data));
        } catch (err: any) {
            throw new Error(err);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = e.target;
        if (id === 'username') {
            setUser((prev: any) => ({ ...prev, username: value.replaceAll(' ', '') }));
        } else if (id === 'bio') {
            setUser((prev: any) => ({ ...prev, info: { ...prev.info, bio: value.slice(0, 150) } }));
        } else {
            setUser((prev: any) => ({ ...prev, info: { ...prev.info, [id]: value.replaceAll(' ', '') } }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (user === null) return;

        try {
            await handleFileUpload();
            await authAxios.patch(`/users/profile/${username}`, { user });
            navigate(`/profile/${user?.username}`);
        } catch (err: any) {
            throw new Error(err);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        const image = new Image();
        image.src = URL.createObjectURL(file);
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            canvas.width = 300;
            canvas.height = 300;
            ctx.drawImage(image, 0, 0, 300, 300);
            const resizedDataUrl = canvas.toDataURL('image/png', 0.8);
            setPreviewSource(resizedDataUrl);
        };
        setSelectedFile(file);
        previewFile(file);
    };

    const previewFile = (file: File): void => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result as string);
        };
    };

    const handleFileUpload = async (): Promise<void> => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('pfp', selectedFile);
        try {
            await authAxios.patch(`/users/profile/${username}/uploadPfp`, formData);
        } catch (err: any) {
            throw new Error(err);
        }
    };

    const pfpSrc = previewSource ? previewSource : initImageUrl;

    return (
        <div id='SettingsPage'>
            <header>
                <Navbar />
            </header>
            <main>
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <Stack className='mainContainer'>
                            <Stack className='top'>
                                <Button component='label' className='avatarContainer' disableRipple onMouseEnter={() => setHoverPfp(true)} onMouseLeave={() => setHoverPfp(false)}>
                                    <input type='file' style={{ display: 'none' }} name='pfp' accept='image/*' onChange={handleFileChange} />
                                    <Avatar className='avatar' src={pfpSrc} alt='pfp'>
                                        <PersonIcon className='personIcon' />
                                    </Avatar>
                                    {hoverPfp && (
                                        <div className='editIconContainer'>
                                            <EditIcon className='editIcon' />
                                        </div>
                                    )}
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
