import React from 'react';
import PostItem from "@/app/components/PostItem";
import { PostProps } from "@/app/types/PostType";

interface PostListProps {
    posts: PostProps[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
    return (
        <div className='w-full max-w-4xl px-4'>
            {posts.map((post: PostProps) => (
                <PostItem key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostList;
