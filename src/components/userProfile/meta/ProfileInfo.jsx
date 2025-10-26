import Badge from '@/components/ui/Badge';
import RoleBadge from '@/components/userProfile/RoleBadge';

const ProfileInfo = ({ user }) => (
  <div className="flex-1 min-w-0 text-center sm:text-left">
    <div className="mb-1">
      <h4 className="text-2xl font-bold  text-gray-900 dark:text-white mb-1 tracking-tight wrap-break-words">
        {user?.full_name}
      </h4>
    </div>
    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
      <RoleBadge variant='solid' showIcon />
      {user?.memberUnits?.length > 0 && (
        <>
          <span className="text-gray-400 dark:text-gray-500">•</span>
          {user.memberUnits.map((unit) => (
            <Badge
              key={unit.id || unit.name}
              variant="solid"
              size="sm"
              color="light"
            >
              {unit.name}
            </Badge>
          ))}
        </>
      )}
    </div>
  </div>
);

export default ProfileInfo;
