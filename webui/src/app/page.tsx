"use client";
import { ReactElement, ReactNode } from "react";

type PageProps = {
  children: ReactNode;
  title?: string;
};

export default function Page(): ReactElement {
  return (
    <main>
      <h1 className="text-5xl font-bold">Activities.js</h1>
      <h2>The activities tracker that doesn't suck</h2>
      <button className="bg-blue-500" onClick={() => { window.location.href = '/account' }}>Your account</button>
    </main>
  );
}

