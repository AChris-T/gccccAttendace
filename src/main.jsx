import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//css 
import './index.css';
import "react-toastify/dist/ReactToastify.css";
import 'flatpickr/dist/flatpickr.css';
import "nprogress/nprogress.css";

import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { ToastContainer } from "react-toastify";
import { AppWrapper } from "./components/common/PageMeta.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AppWrapper>
        <App />
        <ToastContainer />
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>
);
