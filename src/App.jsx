import AppRoutes from "@/router";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(AppRoutes);

export default function App() {
  return <RouterProvider router={router} />
}