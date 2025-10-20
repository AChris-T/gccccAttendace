import React from 'react';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

//css
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'nprogress/nprogress.css';

import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { ToastContainer } from 'react-toastify';
import { AppWrapper } from './components/common/PageMeta.jsx';
import { QueryProvider } from './providers/QueryProvider.jsx';
import ErrorBoundary from '@/components/error/ErrorBoundary';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider>
        <AppWrapper>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
          <ToastContainer />
        </AppWrapper>
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>
);
