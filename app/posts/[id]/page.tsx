'use client'
import { PostProps } from "@/app/types/PostType";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import LogOut from "@/app/components/LogOut";
import {useUser} from "@/app/context/UserContext";
import {useRouter} from "next/navigation";

interface Params {
    id: string;
}

interface Props {
    params: Params;
}

const Page = ({ params }: Props) => {
    const postId = Number(params.id);
    const [post, setPost] = useState<PostProps | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { user } = useUser();
    const router = useRouter();

    const fetchPost = async (postId: number):Promise<void> => {
        if (user?.token) {
            try {
            const response = await axios.get(`https://dummyjson.com/auth/posts/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                }
            });
            setPost(response.data);
        } catch (error) {
            setError('No information');
        } } else {
            router.push('/login')
            }
    };

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else {
            fetchPost(postId);
        }
    }, [postId]);

    const goBackText = '< go back'
    return (
        <div className='min-h-screen w-full  bg-white text-black px-20 pt-10 text-lg'>
            <LogOut/>
            <Link href='/posts'><div className='max-w-6xl mx-auto pb-8 text-gray-500 text-sm'>{goBackText}</div></Link>
            {error ? (
                <p>No information available</p>
            ) : post ? (
                <div className='max-w-4xl mx-auto'>
                    <h1 className='text-3xl font-bold text-center mb-6'>{post.title}</h1>
                    <p className='text-lg mb-4'>{post.body}</p>

                    <div className='flex flex-wrap mb-4'>
                        <strong className='mr-2'>Tags:</strong>
                        {post.tags.map(tag => (
                            <span key={tag} className='bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2'>{tag}</span>
                        ))}
                    </div>
                    {Object.entries(post.reactions).map(([key, value]) => (
                        <span key={key} className='text-lg mr-4'><strong>{key}: </strong>{value}</span>
                    ))}
                    <span className='text-lg mb-4'><strong>views: </strong>{post.views}</span>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Page;
