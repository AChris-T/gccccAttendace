import { useAuthStore } from "../../store/auth.store";

export default function UserUnitsCard() {
  const { user } = useAuthStore();

  const ledUnits = user?.ledUnits || [];
  const assistedUnits = user?.assistedUnits || [];
  const memberUnits = user?.memberUnits || [];

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 text-lg">Unit Information</h3>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Led Units */}
        <div>
          <p className="text-gray-500 text-sm mb-2">Led Units</p>
          {ledUnits.length > 0 ? (
            <ul className="space-y-1">
              {ledUnits.map((unit) => (
                <li key={unit.id || unit.name} className="font-medium text-gray-800">
                  {unit.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-sm">None</p>
          )}
        </div>

        {/* Assisted Units */}
        <div>
          <p className="text-gray-500 text-sm mb-2">Assisted Units</p>
          {assistedUnits.length > 0 ? (
            <ul className="space-y-1">
              {assistedUnits.map((unit) => (
                <li key={unit.id || unit.name} className="font-medium text-gray-800">
                  {unit.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-sm">None</p>
          )}
        </div>

        {/* Member Units */}
        <div>
          <p className="text-gray-500 text-sm mb-2">Member Units</p>
          {memberUnits.length > 0 ? (
            <ul className="space-y-1">
              {memberUnits.map((unit) => (
                <li key={unit.id || unit.name} className="font-medium text-gray-800">
                  {unit.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-sm">None</p>
          )}
        </div>
      </div>
    </div>
  );
}
