import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppRoutes from "./router";

const router = createBrowserRouter(AppRoutes);

export default function App() {
  return <RouterProvider router={router} />
}