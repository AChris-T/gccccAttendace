import { UserRole } from './constant';

export const getUserRoles = (roles) => {
  const isAdmin = roles?.includes(UserRole.ADMIN);
  const isLeader = roles?.includes(UserRole.LEADER);
  const isMember = roles?.includes(UserRole.MEMBER);
  const isFirstTimer = roles?.includes(UserRole.FIRST_TIMER);
  return { isAdmin, isLeader, isMember, isFirstTimer };
};

const ROLE_PRIORITY = {
  admin: 3,
  leader: 2,
  member: 1,
};

export function compareRoles(roleA, roleB) {
  const rankA = ROLE_PRIORITY[roleA] || 0;
  const rankB = ROLE_PRIORITY[roleB] || 0;

  if (rankA > rankB) return 1;
  if (rankA < rankB) return -1;
  return 0;
}

export function getHighestRole(roles = []) {
  if (!roles.length) return null;

  return roles.reduce((highest, current) => {
    return compareRoles(current, highest) === 1 ? current : highest;
  }, roles[0]);
}

export function hasRoleOrHigher(roles = [], requiredRole) {
  const requiredRank = ROLE_PRIORITY[requiredRole] || 0;
  return roles.some((role) => (ROLE_PRIORITY[role] || 0) >= requiredRank);
}
