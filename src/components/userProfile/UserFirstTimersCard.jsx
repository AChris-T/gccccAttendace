import { useAuthStore } from "../../store/auth.store";

export default function UserFirstTimersCard() {
  const { user } = useAuthStore();

  const firstTimers = user?.assignedFirstTimers || [];

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 text-lg">Assigned First Timers</h3>
        <p className="text-gray-500 text-sm">
          Total: <span className="font-medium text-gray-800">{firstTimers.length}</span>
        </p>
      </div>

      {firstTimers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-left text-sm text-gray-500">
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Phone</th>
                <th className="py-2 px-3">Gender</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {firstTimers.map((timer) => (
                <tr key={timer.id} className="border-b border-gray-100 text-sm">
                  <td className="py-2 px-3 text-gray-800 font-medium">{timer.name || "N/A"}</td>
                  <td className="py-2 px-3 text-gray-600">{timer.phone_number || "N/A"}</td>
                  <td className="py-2 px-3 text-gray-600">{timer.gender || "N/A"}</td>
                  <td className="py-2 px-3 text-gray-600">{timer.status || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-400 text-sm">No first timers assigned.</p>
      )}
    </div>
  );
}
