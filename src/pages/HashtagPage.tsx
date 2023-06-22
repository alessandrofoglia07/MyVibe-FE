import React, { useState, useEffect } from 'react';
import '../style/HashtagPage.scss';
import { useParams, useSearchParams } from 'react-router-dom';
import authAxios from '../api/authAxiosApi';
import { IPost } from '../types';
import Post from '../components/Post';
import { Typography, Stack, Link } from '@mui/material';
import Navbar from '../components/navbar';
import Loading from '../components/Loading';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import useTheme from '../hooks/useTheme';
import { Helmet } from 'react-helmet';
import useWindowWidth from '../hooks/useWindowWidth';

const HashtagPage: React.FC<any> = () => {
    const { themeColor } = useTheme();

    const hashtag = useParams().hashtag?.toLocaleLowerCase();
    const [searchParams] = useSearchParams();

    const [posts, setPosts] = useState<IPost[]>([]);
    const [postsNum, setPostsNum] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;

    const width = useWindowWidth();

    useEffect(() => {
        if (posts.length !== 0) return;
        getPosts();
    }, []);

    const getPosts = async () => {
        try {
            setLoading(true);
            const res = await authAxios.get(`/posts/hashtag/${hashtag}?page=${page}`);
            setPosts((prev: any) => prev.concat(res.data.posts));
            setPostsNum(res.data.postsNum);
        } catch (err: any) {
            throw new Error(err);
        } finally {
            setLoading(false);
        }
    };

    const titleColor = () => {
        if (!hashtag) return;
        if (hashtag.length % 2 === 0 && hashtag.length % 3 === 0) {
            return 'color1';
        } else if (hashtag.length % 2 === 0) {
            return 'color2';
        } else if (hashtag.length % 3 === 0) {
            return 'color3';
        } else {
            return 'color4';
        }
    };

    return (
        <div id='HashtagPage'>
            <Helmet>
                <title>#{hashtag} - MyVibe.</title>
                <meta name='description' content={`Posts tagged #${hashtag}`} />
                <meta name='theme-color' content={themeColor} />
            </Helmet>
            <Navbar />
            <div id='title'>
                <Typography className={`hashtagTitle ${titleColor()}`}>
                    <strong>
                        Posts tagged <br /> <span>#{hashtag}</span>
                    </strong>
                </Typography>
            </div>
            {loading ? (
                <Loading />
            ) : (
                <div className='postsContainer'>
                    <Stack spacing={2} width='80%'>
                        {posts.map((post: IPost) => (
                            <Post
                                key={post._id}
                                _id={post._id}
                                author={post.author}
                                authorUsername={post.authorUsername}
                                content={post.content}
                                date={post.createdAt}
                                likes={post.likes.length}
                                liked={post.liked}
                                comments={post.comments}
                                authorVerified={post.authorVerified}
                            />
                        ))}
                    </Stack>
                    <Stack className='navigationIcons' direction={page === 1 ? 'row-reverse' : 'row'}>
                        {page > 1 && (
                            <Link className='showMore' href={`/hashtag/${hashtag}?page=${page - 1}`}>
                                <NavigateBeforeIcon /> {width > 768 && 'Previous'}
                            </Link>
                        )}
                        {postsNum > posts.length + (page - 1) * 10 && (
                            <Link className='showMore' href={`/hashtag/${hashtag}?page=${page + 1}`}>
                                {width > 768 && 'Next'} <NavigateNextIcon className='icon' />
                            </Link>
                        )}
                    </Stack>
                    <div className='end' />
                </div>
            )}
        </div>
    );
};

export default HashtagPage;
