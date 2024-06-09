'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from 'next/navigation';
import PostList from "@/app/components/PostList";
import { PostProps } from "@/app/types/PostType";
import LogOut from "@/app/components/LogOut";

export default function Posts() {
    const [posts, setPosts] = useState<PostProps[]>([]);
    const { user } = useUser();
    const router = useRouter();

    const fetchPosts = async (): Promise<void> => {
        if (user?.token) {
            try {
                const res = await axios.get('https://dummyjson.com/auth/posts', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setPosts(res.data.posts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        } else {
            router.push('/login');
        }
    };

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else {
            fetchPosts();
        }
    }, [user]);

    return (
        <div>
            <div className='w-full  bg-white text-black px-20 pt-10 text-lg'>
                <LogOut/>
            </div>
        <div className='bg-white text-gray-900 flex flex-col items-center'>
            <h1 className='text-3xl font-bold py-8'>List of Posts</h1>
            <PostList posts={posts} />
        </div>
        </div>
    );
}
