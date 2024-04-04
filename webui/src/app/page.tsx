"use client";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <div className="border-neutral-950 border-2 rounded-lg shadow-md p-8 max-w-[640px] w-full space-y-8">
        <h1 className="text-3xl font-semibold">Login</h1>
        <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="block w-full rounded-md bg-transparent border-neutral-900 border-2 shadow-sm focus:ring-indigo-500 focus:ring-1"
            placeholder="name@example.com"
            required
          />
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="block w-full rounded-md bg-transparent border-neutral-900 border-2 shadow-sm focus:ring-indigo-200 focus:ring-1"
            placeholder="••••••••"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold rounded-md px-4 py-2 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>

      
    </main>
  );
}
