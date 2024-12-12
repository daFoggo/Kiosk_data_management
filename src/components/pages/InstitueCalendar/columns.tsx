import { ColumnDef } from "@tanstack/react-table";

import { IInstitueCalendar } from "@/models/institue-calendar";

export const columns: ColumnDef<IInstitueCalendar>[] = [
  {
    accessorKey: "autoIncrementId",
    header: "STT",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Tên",
  },
  {
    accessorKey: "iso_datetime",
    header: "Thời gian",
    cell: ({ row }) =>
      new Date(row.original.iso_datetime).toLocaleString("vi-VN"),
  },
  {
    accessorKey: "location",
    header: "Địa điểm",
  },
  {
    accessorKey: "attendees",
    header: "Người tham dự",
  },
  {
    accessorKey: "preparation",
    header: "Chuẩn bị",
  },
];
