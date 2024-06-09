'use client'
import {UserProvider} from "@/app/context/UserContext";
import Link from "next/link";
import LogOut from "@/app/components/LogOut";
import React from "react";

export default function Home() {

  return (
      <div className='min-h-screen bg-white text-gray-900 flex flex-col items-center'>
          <div className='w-full  bg-white text-black px-20 pt-10 text-lg'>
              <div className='mx-auto flex justify-end'>
                  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                      <a href="/login">Login</a>
                  </button>
              </div>
          </div>
          <h1 className='text-3xl font-bold py-8'>Welcome!</h1>
          <p className='text-black text-xl'>Go to <a className='text-blue-600 text-xl text-decoration-line: underline' href='/posts'>posts</a></p>
          <p className='text-black text-xl'>But before don't forget to log in</p>
      </div>
  );
}
