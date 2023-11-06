import { useState, useEffect } from "react";
import User from "@/models/User";

const ClientsList = () => {
  const [clients, setClients] = useState<User[]>([]);

  useEffect(() => {
    fetch("https://your-api-url/clients")
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.error(error));
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      <h2>Clients List</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.userId}>
            <span>Name: {client?.firstName}</span>
            <span>Email: {client.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsList;
