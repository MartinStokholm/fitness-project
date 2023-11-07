export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-wrap gap-2 p-4">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
          <div className="bg-blue-500 rounded-lg p-4 h-32">
            <h2 className="text-white font-semibold">Clients</h2>
            <p className="text-white text-opacity-75">
              View and manage your clients
            </p>
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
          <div className="bg-green-500 rounded-lg p-4 h-32">
            <h2 className="text-white font-semibold">Workout Programs</h2>
            <p className="text-white text-opacity-75">
              Manage workout programs
            </p>
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
          <div className="bg-yellow-500 rounded-lg p-4 h-32">
            <h2 className="text-white font-semibold">Exercises</h2>
            <p className="text-white text-opacity-75">Add and edit exercises</p>
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
          <div className="bg-red-500 rounded-lg p-4 h-32">
            <h2 className="text-white font-semibold">Reports</h2>
            <p className="text-white text-opacity-75">View training reports</p>
          </div>
        </div>
      </div>
    </main>
  );
}
