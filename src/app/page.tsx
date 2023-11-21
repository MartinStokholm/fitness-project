import React from "react";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { ToastContainer } from "react-toastify";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="p-8 bg-blue-100 rounded-b-2xl">
        <h2 className="font-bold text-2xl mb-8">
          Welcome {session?.user?.name}!<br></br>
          <p>You are logged in as a {session?.user?.role}</p>
        </h2>

        <p className="text-black text-opacity-75">
          <p className="text-center text-6xl pb-8">
            To get started, go to your dashboard!
          </p>
        </p>
        <Link
          className="text-black text-6xl text-center"
          href={"/dashboard/{role}"}
          as={`/dashboard/${session?.user?.role?.toLowerCase()}`}
        >
          <p className="animate-bounce pt-4">⬇️⬇️⬇️⬇️⬇️⬇️⬇️</p>
          <p className="p-4 m-2 animate-bounce text-black font-semibold">
            ➡️ :.Dashboard.:⬅️
          </p>
          <p className="animate-bounce py-4">⬆️⬆️⬆️⬆️⬆️⬆️⬆️</p>
        </Link>
      </div>
      <ToastContainer />
    </main>
  );
}
