import { authOptions } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="flex min-h-screen flex-col items-center pt-8">
      <h1>The Fitness App</h1>
      <div className="p-8 bg-blue-400 rounded">
        <h2 className="font-bold">Welcome {session?.user?.name}!</h2>
        <p></p>
      </div>
    </main>
  );
}
