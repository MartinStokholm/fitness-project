import CreatePersonalTrainerForm from "@/components/CreatePersonalTrainerForm";
import { checkSession } from "@/server/actions";
import { redirect } from "next/navigation";

export default async function ManagerPage() {
  const session = await checkSession();
  if (session?.role?.toLowerCase() !== "manager") {
    redirect("/dashboard/" + session?.role?.toLowerCase());
  }
  return (
    <main className="px-4 flex min-h-screen flex-col items-center justify-between">
      <div className="p-4 min-w-full">
        <div className="bg-blue-200 p-6 shadow-2xl border-4 border-blue-100-300 rounded-t-2xl mb-12">
          <h2 className="text-4xl text-center text-gray-800 pb-8">
            Create a personal trainer
          </h2>
          <CreatePersonalTrainerForm />
        </div>
      </div>
    </main>
  );
}
