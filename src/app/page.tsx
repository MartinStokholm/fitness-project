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
        <h2 className="font-bold text-2xl mb-8 text-center">
          Welcome {session?.user?.name}!<br></br>
          <p>You are logged in as a {session?.user?.role}</p>
        </h2>

        <p className="text-black text-opacity-75 text-center text-4xl pb-8">
          To get started, go to your dashboard!
        </p>
        <Link
          className="text-black text-6xl text-center"
          href={"/dashboard/{role}"}
          as={`/dashboard/${session?.user?.role?.toLowerCase()}`}
        >
          <p className="p-4 m-2 animate-bounce text-black font-semibold">
            CLICK ME!️
          </p>
        </Link>
      </div>
      <ToastContainer />
      {/*TODO ADD TOASTING ON FORMS*/}
      {/*TODO ADD LOADING SKELETON*/}
    </main>
  );
}
