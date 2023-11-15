import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import CreateClient from "@/components/CreateClient";

export default async function ClientsPage() {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token;
  const url = "https://afefitness2023.azurewebsites.net/api/Users";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "application/json",
    },
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full p-4">
        <h2 className="text-4xl pb-8">My Clients</h2>
        <h2 className="text-4xl pb-8">Create new client</h2>
        <CreateClient />
      </div>
    </main>
  );
}
