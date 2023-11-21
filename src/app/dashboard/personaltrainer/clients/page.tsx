import CreateClientForm from "@/components/CreateClientForm";
import ClientList from "@/components/ClientList";
import { checkSession, getAllClients } from "@/server/actions";

export default async function ClientsPage() {
  const clients = await getAllClients();
  const session = await checkSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full p-4">
        <div className="bg-blue-200 p-6 shadow-2xl border-4 border-blue-100-300 rounded-t-2xl mb-12">
          <h2 className="text-4xl text-center text-gray-800 pb-8">
            Create new client that you can manage
          </h2>
          <CreateClientForm />
        </div>
        <h2 className="text-4xl text-center text-gray-800 pb-8">
          {session?.name}
          {"'s"} Clients
        </h2>
        <ClientList clients={clients?.data} />
      </div>
    </main>
  );
}
