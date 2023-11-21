import { ReactNode } from "react";
import DashboardNav from "@/components/DashboardNav";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex">
      <div className="flex justify-start ">
        <div className="flex flex-col justify-start bg-green-100 min-w-[200px]">
          <DashboardNav
            route="manager"
            title="Trainers"
            bgColor="bg-amber-500"
          />
        </div>
      </div>
      {children}
    </main>
  );
}
