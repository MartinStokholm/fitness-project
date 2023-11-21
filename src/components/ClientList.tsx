import User from "@/models/User";

export default function ClientList({
  clients,
}: {
  clients: User[] | undefined;
}) {
  return (
    <div className="bg-white p-4 rounded-md shadow-md ">
      {clients?.length === 0 ? (
        <p>No clients available.</p>
      ) : (
        <ul>
          {clients?.map((client) => (
            <li
              key={client.userId}
              className="py-2 flex flex-wrap justify-between w-full"
            >
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
