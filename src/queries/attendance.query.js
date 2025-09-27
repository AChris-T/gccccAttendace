import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AttendanceService } from '../services/attendance.service';
import { QUERY_KEYS } from '../utils/queryKeys';
import { useMemo, useState } from 'react';
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

// Get all attendance records
export const useAllAttendance = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.ATTENDANCE.ALL_RECORDS,
    queryFn: async () => {
      const { data } = await AttendanceService.getAllAttendance();
      return data || [];
    },
    staleTime: 30 * 1000, // 30 seconds
    cacheTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
};

export const useFilteredAttendance = () => {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString('default', { month: 'long' })
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { data: attendanceHistory = [], ...queryProps } =
    useAttendanceHistory();

  const filteredAttendanceHistory = useMemo(() => {
    if (attendanceHistory.length === 0) return [];

    return attendanceHistory.filter((record) => {
      if (!record.attendance_date) return false;

      const recordDate = new Date(record.attendance_date);
      const recordMonth = recordDate.toLocaleString('default', {
        month: 'long',
      });
      const recordYear = recordDate.getFullYear();

      const matchesMonth =
        selectedMonth === 'All' || recordMonth === selectedMonth;
      const matchesYear = recordYear === selectedYear;

      return matchesMonth && matchesYear;
    });
  }, [attendanceHistory, selectedMonth, selectedYear]);

  return {
    attendanceHistory,
    filteredAttendanceHistory,
    selectedMonth,
    selectedYear,
    setSelectedMonth,
    setSelectedYear,
    ...queryProps,
  };
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
      // Invalidate attendance queries
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ATTENDANCE.ALL });

      options.onSuccess?.(data, variables);
    },
    onError: (error) => {
      const message =
        error.response?.data?.message ||
        'Something went wrong while marking absentees';
      options.onError?.(new Error(message));
    },
  });
};

export const useMonthlyAttendanceStats = (year, mode) => {
  return useQuery({
    queryKey: QUERY_KEYS.ATTENDANCE.BY_MONTH_YEAR(),
    queryFn: () => AttendanceService.getAdminAttendanceMonthlyStats(year, mode),
    // enabled: !!id,
    // staleTime: 5 * 60 * 1000, // 5 minutes
    // ...options,
  });
};
