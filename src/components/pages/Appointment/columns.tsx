import { ColumnDef } from "@tanstack/react-table";
import { IAppointmentData } from "@/models/appointment";
import { convertStatus } from "@/utils/helper/common";

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
  },
  {
    accessorKey: "end_time",
    header: "Thời gian kết thúc",
  },
  {
    accessorKey: "location",
    header: "Địa điểm",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row}) => {
      return convertStatus(row.getValue("status"));
    }
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
