"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function DashboardNav({
  route,
  title,
  bgColor,
}: {
  route: string;
  title: string;
  bgColor?: string;
}) {
  const session = useSession();

  return (
    <div className={"hover:scale-105" + bgColor}>
      <Link
        className="text-zinc-700"
        href={route}
        as={`/dashboard/${session?.data?.user?.role?.toLowerCase()}/${route}`}
      >
        <div className="mx-5 py-4 font-light text-xl">
          <p>📌{title}</p>
        </div>
      </Link>
    </div>
  );
}
