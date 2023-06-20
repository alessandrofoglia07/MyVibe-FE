import React, { useState, useEffect } from 'react';
import '../style/PostPage.scss';
import Post from '../components/Post';
import Navbar from '../components/navbar';
import Loading from '../components/Loading';
import NotFoundPage from './404Page';
import authAxios from '../api/authAxiosApi';
import { useParams } from 'react-router-dom';
import { IPost } from '../types';
import { Link } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import useTheme from '../hooks/useTheme';

const PostPage: React.FC<any> = () => {
    useTheme();
    const { id } = useParams<any>();

    const [post, setPost] = useState<IPost>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            await getPost();
        })();
    }, []);

    const getPost = async (): Promise<void> => {
        setLoading(true);
        try {
            const res = await authAxios.get(`/posts/post/${id}`);
            setPost(res.data);
            document.title = `${res.data.authorUsername}'s post - MyVibe.`;
        } catch (err: any) {
            throw new Error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id='PostPage'>
            {loading ? (
                <Loading />
            ) : post ? (
                <>
                    <header>
                        <Navbar />
                    </header>
                    <main>
                        <Link className='back' onClick={() => window.history.back()}>
                            <NavigateBeforeIcon className='icon' />
                        </Link>
                        <div className='postContainer'>
                            <Post
                                _id={post._id}
                                author={post.author}
                                authorUsername={post.authorUsername}
                                authorVerified={post.authorVerified}
                                comments={post.comments}
                                content={post.content}
                                date={post.createdAt}
                                liked={post.liked}
                                likes={post.likes.length}
                            />
                        </div>
                    </main>
                </>
            ) : (
                <NotFoundPage />
            )}
        </div>
    );
};

export default PostPage;
