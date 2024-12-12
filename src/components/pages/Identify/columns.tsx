import { useState, useMemo, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IDepartment, IIdentifyData } from "@/models/identify";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { ArrowUpDown, Check, ChevronsUpDown, Eye } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BACKEND_HTTPS_IP } from "@/utils/ip";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { convertRole } from "@/utils/helper/common";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const columns: ColumnDef<IIdentifyData>[] = [
  {
    accessorFn: (row: IIdentifyData) => {
      return row.name;
    },
    cell: ({ row, table }) => {
      const filteredRows = table.getFilteredRowModel().rows;
      const filteredIndex = filteredRows.findIndex(
        (filteredRow) => filteredRow.original.name === row.original.name
      );
      return filteredIndex + 1;
    },
    header: "STT",
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Họ và tên
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Vai trò",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return convertRole(role);
    },
  },
  {
    accessorKey: "department",
    header: ({ column, table }) => {
      const departments = Array.from(
        new Set(
          table
            .getCoreRowModel()
            .rows.map((row) => {
              const dept = row.original.department as IDepartment;
              return dept?.department_name || "";
            })
            .filter(Boolean)
        )
      ).sort();

      return (
        <div className="flex justify-center items-center w-full">
          <Select
            onValueChange={(value) => {
              table.getColumn("department")?.setFilterValue(value);
            }}
          >
            <SelectTrigger className="w-fit border-none">
              <SelectValue placeholder="Mã lớp / Phòng ban" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    },
    cell: ({ row }) => {
      const department = row.original.department as IDepartment;
      return department?.department_name || "";
    },
    filterFn: (row, _, filterValue) => {
      if (!filterValue || filterValue === "all") return true;

      const department = row.original.department as IDepartment;
      return department?.department_name === filterValue;
    },
  },
  {
    accessorKey: "dob",
    header: "Ngày sinh",
  },
  {
    accessorKey: "gender",
    header: "Giới tính",
  },
  {
    accessorKey: "img",
    header: "Ảnh",
    cell: ({ row }) => {
      const img = row.getValue("img") as string[];

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">
              <Eye className="size-2" />
            </Button>
          </DialogTrigger>
          <DialogContent
            className="p-4 w-[90%] sm:max-w-[625px] rounded-md"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <DialogTitle>Dữ liệu ảnh</DialogTitle>
            <Carousel>
              <CarouselContent>
                {img.map((item, index) => {
                  return (
                    <CarouselItem key={index}>
                      <LazyLoadImage
                        alt={"Ảnh " + index}
                        src={`${BACKEND_HTTPS_IP}${item}`}
                        className="rounded-lg"
                        effect="blur"
                      />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
