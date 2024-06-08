import React from 'react';
import { PostProps } from "@/app/types/PostType";
import Link from "next/link";

interface PostItemProps {
    post: PostProps;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
    return (
        <div className='border-b border-gray-200 py-6'>
            <Link href={String(post.id)}>
                <h1 className='text-2xl font-semibold text-black hover:underline'>{post.title}</h1>
            </Link>
            <p className='text-gray-700 mt-2'>{post.body}...</p>
            <div className='mt-4'>
                {post.tags.map(tag => (
                    <span key={tag} className='bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2 mt-2'>{tag}</span>
                ))}
                <span className='text-sm text-gray-600 mb-4'>{post.views} views</span>
            </div>

        </div>
    );
};

export default PostItem;
