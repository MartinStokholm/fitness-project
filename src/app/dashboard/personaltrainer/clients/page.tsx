import CreateClient from "@/app/components/CreateClient";
import ClientList from "@/app/components/ClientList";
import { getAllClients } from "@/app/server/actions";
export default async function ClientsPage() {
  const clients = await getAllClients();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full p-4">
        <div className="bg-zinc-200 p-6 shadow-2xl border-4 border-gray-300 rounded-t-2xl mb-12">
          <h2 className="text-4xl text-center text-gray-800 pb-8">
            My Clients
          </h2>
          <ClientList clients={clients.data} />
        </div>
        <div className="bg-zinc-200 p-6 shadow-2xl border-4 border-gray-300 rounded-t-2xl mb-12">
          <h2 className="text-4xl text-center text-gray-800 pb-8">
            Create new client
          </h2>
          <CreateClient />
        </div>
      </div>
    </main>
  );
}
