import { UserRole } from './constant';

export const hasRole = (userRoles, role) => {
  return Array.isArray(userRoles) && userRoles.includes(role);
};

export const hasUnit = (userUnits, unit) => {
  return Array.isArray(userUnits) && userUnits.includes(unit);
};

export const getUserRoles = (roles) => {
  const isAdmin = roles?.includes(UserRole.ADMIN || UserRole.SUPER_ADMIN);
  const isLeader = roles?.includes(UserRole.LEADER);
  const isMember = roles?.includes(UserRole.MEMBER);
  return { isAdmin, isLeader, isMember };
};
