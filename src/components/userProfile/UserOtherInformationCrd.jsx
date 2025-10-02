import { useAuthStore } from "../../store/auth.store";

export default function UserOtherInformationCard() {
  const { user } = useAuthStore();

  // Extract roles and units safely
  const roles = Array.isArray(user?.roles) ? user.roles.join(", ") : user?.roles || "—";
  const units = Array.isArray(user?.units) && user.units.length > 0
    ? user.units.map((u) => u.name).join(", ")
    : "—";

  const fields = [
    { label: "Community", value: user?.community },
    { label: "Worker", value: user?.worker },
    { label: "Role", value: roles },
    { label: "Status", value: user?.status },
    { label: "Unit", value: units },
  ];

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Other Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            {fields.map((field) => (
              <div key={field.label}>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  {field.label}
                </p>
                <div className="px-2 py-2 text-sm font-medium text-gray-800 dark:text-white/90 rounded-md cursor-not-allowed bg-transparent">
                  {field.value || "—"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
