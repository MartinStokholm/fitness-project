import CreatePersonalTrainerForm from "@/components/CreatePersonalTrainerForm";

const ManagerPage = () => {
  return (
    <>
      <div className="bg-zinc-200 p-6 shadow-2xl border-4 border-gray-300 rounded-t-2xl mb-12">
        <h2 className="text-4xl text-center text-gray-800 pb-8">
          Create a personal trainer
        </h2>
        <CreatePersonalTrainerForm />
      </div>
    </>
  );
};

export default ManagerPage;
