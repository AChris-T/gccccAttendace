import { UserRole } from './constant';

export const getUserRoles = (roles) => {
  const isAdmin = roles?.includes(UserRole.ADMIN);
  const isLeader = roles?.includes(UserRole.LEADER);
  const isMember = roles?.includes(UserRole.MEMBER);
  const isFirstTimer = roles?.includes(UserRole.FIRST_TIMER);
  return { isAdmin, isLeader, isMember, isFirstTimer };
};
