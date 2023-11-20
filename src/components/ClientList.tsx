"use client";

import User from "@/models/User";

export default function ClientList({
  clients,
}: {
  clients: User[] | undefined;
}) {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Clients List</h2>

      {clients?.length === 0 ? (
        <p>No clients available.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients?.map((client) => (
            <li key={client.userId} className="bg-white p-4 rounded shadow-md">
              <p className="text-lg font-semibold mb-2">
                {client.firstName} {client.lastName}
              </p>
              <p className="text-gray-600">{client.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
