import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";
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
import { IAuthContextType } from "@/models/auth-context";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated = false, user } = useAuth() as IAuthContextType;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser && !isAuthenticated) {
      return;
    }

    if (!storedToken || !storedUser) {
      navigate(routes.login, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated && user?.role === "admin" ? <Outlet /> : null;
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
    element: <Navigate to={routes.identifyData} />,
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
