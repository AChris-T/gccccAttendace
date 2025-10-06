import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AttendanceService } from '../services/attendance.service';
import { QUERY_KEYS } from '../utils/queryKeys';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../lib/toastify';
import { handleApiError } from '../utils/helper';

export const useAttendanceHistory = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.ATTENDANCE.HISTORY,
    queryFn: async () => {
      const { data } = await AttendanceService.getAttendanceHistory();
      return data || [];
    },
    staleTime: 30 * 1000, // 30 seconds
    cacheTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
};

export const useAllAttendance = (params = {}, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.ATTENDANCE.ALL_RECORDS(params),
    queryFn: async () => {
      const { data } = await AttendanceService.getAllAttendance(params);
      return data || [];
    },
    cacheTime: 5 * 60 * 1000,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    ...options,
  });
};
export const useUserAttendance = (params = {}, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.ATTENDANCE.ALL_RECORDS(params),
    queryFn: async () => {
      const { data } = await AttendanceService.getAllUserAttendance(params);
      return data || [];
    },
    cacheTime: 5 * 60 * 1000,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    ...options,
  });
};

// Mark attendance mutation
export const useMarkAttendance = (options = {}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: AttendanceService.markAttendance,
    onSuccess: (data, variables) => {
      //   // Invalidate attendance queries to refresh data
      //   queryClient.invalidateQueries({
      //     queryKey: QUERY_KEYS.ATTENDANCE.HISTORY,
      //   });
      //   queryClient.invalidateQueries({
      //     queryKey: QUERY_KEYS.ATTENDANCE.ALL_RECORDS,
      //   });
      Toast.success(data?.message || 'Attendance submitted successfully');
      navigate(`/dashboard`);
      options.onSuccess?.(data, variables);
    },
    onError: (error) => {
      const message = handleApiError(error);
      Toast.error(message);
      options.onError?.(new Error(message));
    },
  });
};

// Mark absentees mutation
export const useMarkAbsentees = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AttendanceService.markAbsentees,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ATTENDANCE.ALL_RECORDS(),
      });
      Toast.success(data?.message);
      options.onSuccess?.(data, variables);
    },
    onError: (error) => {
      const message = handleApiError(error);
      Toast.error(message);
      options.onError?.(new Error(message));
    },
  });
};

export const useAssignAbsenteesToLeaders = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AttendanceService.assignAbsenteesToLeaders,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ATTENDANCE.ALL_RECORDS(),
      });
      Toast.success(data?.message);
      options.onSuccess?.(data, variables);
    },
    onError: (error) => {
      console.log({ error });
      const message = handleApiError(error);
      Toast.error(message);
      options.onError?.(new Error(message));
    },
  });
};

export const useUsersMonthlyAttendanceStats = (year, month) => {
  return useQuery({
    queryKey: QUERY_KEYS.ATTENDANCE.USER_BY_MONTH_YEAR(year, month),
    queryFn: async () => {
      const { data } = await AttendanceService.getUserAttendanceMonthlyStats(
        year,
        month
      );
      return data;
    },
    // enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    // ...options,
  });
};

//  usher attendance
export const useMonthlyAttendanceStats = (year, mode) => {
  return useQuery({
    queryKey: QUERY_KEYS.ATTENDANCE.BY_MONTH_YEAR(year, mode),
    queryFn: async () => {
      const { data } = await AttendanceService.getAdminAttendanceMonthlyStats(
        year,
        mode
      );
      return data;
    },
    // enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    // ...options,
  });
};
