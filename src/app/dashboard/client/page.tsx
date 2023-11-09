export default function ClientPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h1>Client dashboard</h1>
      <div className="flex flex-wrap gap-2 p-4">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
          <h2 className="text-white font-semibold">Clients</h2>
          <p className="text-white text-opacity-75"></p>
        </div>
      </div>
    </main>
  );
}
