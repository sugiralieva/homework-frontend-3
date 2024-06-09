'use client'
import React, { useState, useEffect } from 'react';
import PostItem from "@/app/components/PostItem";
import { PostProps } from "@/app/types/PostType";

interface PostListProps {
    posts: PostProps[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (posts.length > 0) {
            setLoading(false);
        }
    }, [posts]);

    return (
        <div className='w-full max-w-6xl px-4'>
            {loading ? (
                <div className='min-h-screen bg-white'>Loading...</div>
            ) : (
                posts.map((post) => <PostItem key={post.id} post={post} />)
            )}
        </div>
    );
};

export default PostList;
