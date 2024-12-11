import { routes } from "@/router/routes";
import { ChartArea, Database } from "lucide-react";

export const NAVIGATION_LINKS = [
  {
    title: "Dữ liệu",
    icon: Database,
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
    isActive: false,
    items: [
      {
        title: "Lịch hẹn",
        url: routes.appointmentStatistics,
      },
    ],
  },
];
