'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import {UserProvider} from "@/app/context/UserContext";
import PostList from "@/app/components/PostList";
import { PostProps } from "@/app/types/PostType";
import Link from "next/link";

export default function Home() {

  return (
      <UserProvider>
        <div className='bg-white text-gray-900 flex flex-col items-center'>
          <h1 className='text-3xl font-bold py-8'>Main page. Go to <Link href='/posts'>posts</Link></h1>
        </div>
      </UserProvider>
  );
}
