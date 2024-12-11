import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { routes } from "./routes";

import { useAuth } from "@/contexts/auth-context";

import AuthLayout from "@/layouts/auth-layout";
import RootLayout from "@/layouts/root-layout";

import Login from "@/components/pages/Login";
import Dashboard from "@/components/pages/Dashboard";
import Identify from "@/components/pages/Identify";
import InstituteCalendar from "@/components/pages/InstitueCalendar";
import Event from "@/components/pages/Event";
import Appointment from "@/components/pages/Appointment";

import frogJumping from "@/assets/gifs/frog-laughing.gif";

const ProtectedRoute = () => {
  const isAuthenticated = useAuth()?.isAuthenticated ?? false;

  //   return isAuthenticated ? <Outlet /> : <Navigate to={routes.login} replace />;
  return <Outlet />;
};

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: routes.login,
        element: <Login />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: routes.dashboard,
        element: <RootLayout />,
        children: [
          {
            path: routes.dashboard,
            element: <Dashboard />,
            children: [
              {
                path: routes.identifyData,
                element: <Identify />,
              },
              {
                path: routes.instituteCalendarData,
                element: <InstituteCalendar />,
              },
              {
                path: routes.eventData,
                element: <Event />,
              },
              {
                path: routes.appointmentStatistics,
                element: <Appointment />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/dashboard/identify-data" replace />,
  },
  {
    path: "*",
    element: (
      <div className="flex flex-col gap-2 items-center justify-center h-screen">
        <p className="font-semibold">Biết ông bốn không ? </p>
        <p className="font-semibold">404 Not Found</p>
        <img
          src={frogJumping}
          alt="insert ảnh ếch cười vào mặt bạn"
          className="rounded-md"
        />
      </div>
    ),
  },
]);
