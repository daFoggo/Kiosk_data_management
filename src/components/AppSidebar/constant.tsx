import { routes } from "@/router/routes";
import { ChartArea, Database } from "lucide-react";

export const NAVIGATION_LINKS = [
  {
    title: "Dữ liệu",
    icon: Database,
    url: "#data",
    isActive: false,
    items: [
      {
        title: "Nhận diện",
        url: routes.identifyData,
      },
      {
        title: "Lịch công tác Viện",
        url: routes.instituteCalendarData,
      },
      {
        title: "Sự kiện",
        url: routes.eventData,
      },
    ],
  },
  {
    title: "Thống kê",
    icon: ChartArea,
    url: "#statistics",
    isActive: false,
    items: [
      {
        title: "Lịch hẹn",
        url: routes.appointmentStatistics,
      },
    ],
  },
];
