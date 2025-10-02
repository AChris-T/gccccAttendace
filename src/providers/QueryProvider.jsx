import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryErrorBoundary } from '../components/error/QueryErrorBoundary';
import { queryClient } from '../utils/config/queryClient';

export const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorBoundary>
        {children}
        {!import.meta.env.PROD && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryErrorBoundary>
    </QueryClientProvider>
  );
};
