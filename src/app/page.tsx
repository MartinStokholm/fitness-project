import { authOptions } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="flex min-h-screen flex-col items-center pt-8">
      <h1>The Fitness App</h1>
      <div className="p-8 bg-blue-400 rounded">
        <h2 className="font-bold">Welcome {session?.user?.name}!</h2>
        <p className="text-white text-opacity-75">
          This is a fitness app that can be used by personal trainers and their
          clients.
        </p>
        <p className="text-white text-opacity-75">
          To get started, go to your{" "}
          <Link
            className="underline text-white text-opacity-75"
            href={"/dashboard/{role}"}
            as={`/dashboard/${session?.user?.role?.toLowerCase()}`}
          >
            Dashboard
          </Link>
        </p>
      </div>
    </main>
  );
}
