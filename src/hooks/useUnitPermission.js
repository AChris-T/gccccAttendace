import { useAuthStore } from '@/store/auth.store';

export const useHasUnit = (unit) => {
  const { userUnits } = useAuthStore();
  return userUnits?.includes(unit) ?? false;
};

export const useHasAnyUnit = (units) => {
  const { userUnits } = useAuthStore();
  return units.some((unit) => userUnits?.includes(unit));
};

export const useHasAllUnits = (units) => {
  const { userUnits } = useAuthStore();
  return units.every((unit) => userUnits?.includes(unit));
};
