import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IFormData, IInstitueCalendar } from "@/models/institue-calendar";
import {
  GET_INSTITUE_CALENDAR_DATA_IP,
  UPDATE_INSTITUE_CALENDAR_DATA_IP,
} from "@/utils/ip";
import axios from "axios";
import { FileScan } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { columns } from "./columns";

const InstitueCalendar = () => {
  const [institueCalendar, setInstitueCalendar] = useState<IInstitueCalendar[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm<IFormData>({
    defaultValues: {
      file: undefined,
    },
  });

  useEffect(() => {
    handleGetInstitueCalendar();
  }, []);

  const handleGetInstitueCalendar = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(GET_INSTITUE_CALENDAR_DATA_IP);

      if (response.data.success) {
        setInstitueCalendar(response?.data.payload);
      }
    } catch (error) {
      toast.error("Có lỗi khi lấy dữ liệu lịch tuần");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateInstitueCalendar = async (data: IFormData) => {
    setIsUpdating(true);
    try {
      const file = data.file[0];
      if (!file) {
        toast.error("Vui lòng chọn một tệp để tải lên");
        return;
      }

      if (
        file.type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        toast.error("Chỉ chấp nhận tệp .docx");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      console.log(file);

      const response = await axios.post(
        UPDATE_INSTITUE_CALENDAR_DATA_IP,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Cập nhật lịch tuần thành công");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi tải lên tệp");
      console.error("Upload error:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-fit">
            <FileScan className="size-2" />
            Cập nhật lịch tuần
          </Button>
        </DialogTrigger>
        <DialogContent
          className="p-4 w-[90%] sm:max-w-[625px] rounded-md"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Tải lên lịch tuần mới</DialogTitle>
            <DialogDescription>Chỉ chấp nhận tệp .docx.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdateInstitueCalendar)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tệp lịch tuần</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".docx"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit">
                    {isUpdating ? "Đang cập nhật..." : "Tải lên"}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <DataTable
        columns={columns}
        data={institueCalendar}
        isLoading={isLoading}
        colToSearch="name"
        searchPlaceholder="Tìm kiếm lịch tuần..."
      />
    </div>
  );
};

export default InstitueCalendar;
