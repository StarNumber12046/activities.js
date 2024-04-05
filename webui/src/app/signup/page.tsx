"use client";
import Image from "next/image";
import { useState } from "react";
import Cookies from "js-cookie";
export default function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignUp = async () => {
    const response = await fetch('/api/account', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'email': email,
        'password': password,
        'username': username
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">

      <div className="grid rounded-lg border-neutral-900 border-[3px] p-10">
        <h1 className="text-5xl font-bold mb-3 text-center">Sign up</h1>
        <p className="my-2 font-semibold">Username</p>
        <input className="p-2 w-auto bg-transparent border-2 border-neutral-900 rounded-lg" id="email" value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
        <p className="my-2 font-semibold">Email Address</p>
        <input className="p-2 w-auto bg-transparent border-2 border-neutral-900 rounded-lg" id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="hello@example.com" />
        <p className="my-2 font-semibold">Password</p>
        <input className="p-2 bg-transparent border-2 border-neutral-900 rounded-lg" type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="••••••••" />

        <button onClick={handleSignUp} className="mt-3 p-2 border-neutral-900 border-2 bg-neutral-200 text-neutral-900 rounded-lg">Register</button>
        <p className="text-neutral-400 mt-3">Already have an account? <a href="/" className="text-blue-600 font-bold">Sign in</a></p>
      </div>
    </main>
  );
}
