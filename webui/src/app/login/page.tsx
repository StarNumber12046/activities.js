"use client";
import { cookies } from "next/headers";
import Image from "next/image";

import Cookies from "js-cookie"
import { useState } from "react";

export default function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    const response = await fetch('/api/login', {
      method: 'POST',
      
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'email': email,
        'password': password,
      },
      body: JSON.stringify({}),
    });
    const data = await response.json();
    console.log(data);
    if (data.status === 'success') {
      Cookies.set('sessionToken', data.token);
      window.location.href = '/';
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <div className="mt-auto mb-auto grid rounded-lg border-neutral-900 border-[3px] p-10 text-cent">
        <h1 className="text-5xl font-bold mb-3 text-center">Sign in</h1>
        <p className="my-2 font-semibold">Email Address</p>
        <input className="p-2 w-auto bg-transparent border-2 border-neutral-900 rounded-lg"  value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="hello@example.com" />
        <p className="my-2 font-semibold">Password</p>
        <input className="p-2 bg-transparent border-2 border-neutral-900 rounded-lg" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        
        <button className="mt-3 p-2 border-neutral-900 border-2 bg-neutral-200 text-neutral-900 rounded-lg" onClick={handleLogin}>Sign in</button>
        <p className="text-neutral-400 mt-3">Don't have an account? <a href="/signup" className="text-blue-600 font-bold">Sign up</a></p>
      </div>

      
    </main>
  );
}
