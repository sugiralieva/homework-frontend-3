'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import {UserProvider} from "@/app/context/UserContext";
import PostList from "@/app/components/PostList";
import { PostProps } from "@/app/types/PostType";

export default function Home() {
  const [posts, setPosts] = useState<PostProps[]>([]);

  const fetchPosts = async (): Promise<void> => {
    try {
      const response = await axios.get('https://dummyjson.com/posts');
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
      <UserProvider>
        <div className='bg-white text-gray-900 flex flex-col items-center'>
          <h1 className='text-3xl font-bold py-8'>List of Posts</h1>
          <PostList posts={posts} />
        </div>
      </UserProvider>
  );
}
