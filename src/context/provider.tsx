"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
export default function Provider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  const [client] = useState(new QueryClient());
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
