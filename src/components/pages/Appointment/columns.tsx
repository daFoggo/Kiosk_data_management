import { ColumnDef } from "@tanstack/react-table";
import { IAppointmentData } from "@/models/appointment";

export const columns: ColumnDef<IAppointmentData>[] = [
  {
    accessorKey: "autoIncrementId",
    header: "STT",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "purpose",
    header: "Mục đích",
  },
  {
    accessorKey: "start_time",
    header: "Thời gian bắt đầu",
    cell: ({ row }) =>
      new Date(row.original.start_time).toLocaleString("vi-VN"),
  },
  {
    accessorKey: "end_time",
    header: "Thời gian kết thúc",
    cell: ({ row }) => new Date(row.original.end_time).toLocaleString("vi-VN"),
  },
  {
    accessorKey: "location",
    header: "Địa điểm",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
  },
  {
    accessorKey: "participants",
    header: "Người tham dự",
    cell: ({ row }) =>
      row.original.participants
        .map((participant) => participant.name)
        .join(", "),
  },
];
