import { authOptions } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="p-8 bg-blue-400 rounded">
        <h1 className="font-bold">Logged in as:</h1>
        <p>{session?.user?.name}</p>
        <p>{session?.user?.email}</p>
      </div>
    </main>
  );
}
