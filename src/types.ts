export interface IPost {
    _id: string;
    author: string;
    authorUsername: string;
    content: string;
    likes: string[];
    comments: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    liked: boolean;
    authorVerified: boolean;
}

export interface IUser {
    _id: string;
    username: string;
    email: string;
    info: any;
    postsIDs: string[];
    followingIDs: string[];
    followersIDs: string[];
    createdAt: Date;
    verified: boolean;
}

export interface PostProps {
    _id: string;
    author: string;
    authorUsername: string;
    content: string;
    date: string;
    likes: number;
    comments: string[];
    liked: boolean;
    authorVerified: boolean;
}

export interface IComment {
    _id: string;
    author: string;
    authorUsername: string;
    content: string;
    likes: string[];
    liked: boolean;
    authorVerified: boolean;
}