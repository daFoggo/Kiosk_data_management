import { vi } from "date-fns/locale";
import { formatInTimeZone } from "date-fns-tz";
import { parseISO } from "date-fns";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IEventData } from "@/models/event";

const timeZone = "Asia/Ho_Chi_Minh";

type ColumnActions = {
  handleEditEvent: (event: IEventData) => void;
  handleDeleteEvent: (event: IEventData) => void;
};

const formatDate = (dateString: string) => {
  return formatInTimeZone(parseISO(dateString), timeZone, "dd/MM/yyyy HH:mm", {
    locale: vi,
  });
};

const columns = ({ handleEditEvent, handleDeleteEvent }: ColumnActions) => [
  {
    accessorKey: "name",
    header: "Tên sự kiện",
  },
  {
    accessorKey: "start_time",
    header: "Thời gian bắt đầu",
    cell: (row: any) => {
      return formatDate(row.getValue("start_time"));
    },
  },
  {
    accessorKey: "end_time",
    header: "Thời gian kết thúc",
    cell: (row: any) => {
      return formatDate(row.getValue("end_time"));
    },
  },
  {
    accessorKey: "location",
    header: "Địa điểm",
  },
  {
    id: "actions",
    cell: (row: any) => {
      const event = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEditEvent(event)}>
              Chỉnh sửa
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteEvent(event)}>
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default columns;
