"use client";
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
export default function AccountPage() {
    const [name, setName] = useState('');
    useEffect(() => {
        const token = Cookies.get('sessionToken');
        if (!token) {
            window.location.href = '/login';
        }
        const handleLogin = async () => {
            const response = await fetch('/api/account', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            console.log(data);
            if (data.status === 'success') {
                setName(data.username);
            }
        }
        handleLogin();
    })


    const handleChangeUsername = async (event: any) => {
        event.preventDefault();
        const token = Cookies.get('sessionToken');
        const username = event.target[0].value;
        const response = await fetch('/api/account', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({name: username}),
        });
        const data = await response.json();
        console.log(data);
      }

      const handleChangePassword = async (event: any) => {
        event.preventDefault();
        const token = Cookies.get('sessionToken');
        const password = event.target[0].value;
        const response = await fetch('/api/account', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({password}),
        });
        const data = await response.json();
        console.log(data);
      }

      const handleDeleteAccount = async (event: any) => {
        event.preventDefault();
        const token = Cookies.get('sessionToken');
        const response = await fetch('/api/account', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        console.log(data);
        if (data.status === 'success') {
            Cookies.remove('sessionToken');
            window.location.href = '/';
        }
      }


    const handleLogout = () => {
        Cookies.remove('sessionToken');
        window.location.href = '/';
    }



  return (
    <div className="flex flex-col items-center justify-center p-5">
      <h1 className="mb-10 text-2xl">Hi, {name}!</h1>
      <div className="grid gap-4">
        <form onSubmit={handleChangeUsername} className="grid gap-2 mb-4">
          <label className="font-semibold">Change username</label>
          <input id="change-username" type="text" required className="p-2 bg-transparent border-2 rounded-lg border-neutral-900" />
          <button type="submit" className="px-4 py-2 bg-neutral-200 text-neutral-900 rounded-lg border-2 border-neutral-900">Change</button>
        </form>
        <form onSubmit={handleChangePassword} className="grid gap-2 mb-4">
          <label className="font-semibold">Change password</label>
          <input id="change-password" type="password" required className="p-2 bg-transparent rounded-lg border-2 border-neutral-900" />
          <button type="submit" className="px-4 py-2 bg-neutral-200 text-neutral-900 rounded-lg  border-neutral-900">Change</button>
        </form>
        <button onClick={handleLogout} className="px-4 py-2 bg-rose-600 text-neutral-200 font-semibold border-2 rounded-lg border-neutral-900">Logout</button>
        <form onSubmit={handleDeleteAccount} className="grid gap-2 mb-4">
          <label className="font-semibold">Delete account</label>
          <button type="submit" className="px-4 py-2 bg-red-500 text-neutral-200 font-semibold rounded-lg border-2 border-neutral-900">Delete</button>
        </form>
      </div>
    </div>
  )
}
