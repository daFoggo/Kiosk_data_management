import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { ShieldCheck } from "lucide-react";
import StatisticBlock from "@/components/StatisticBlock";
import { GET_IDENTIFY_DATA_IP } from "@/utils/ip";
import { IIdentifyData } from "@/models/identify";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { set } from "react-hook-form";

const Identify = () => {
  const [identifyData, setIdentifyData] = useState<IIdentifyData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleGetIdentifyData();
  }, []);

  const handleGetIdentifyData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(GET_IDENTIFY_DATA_IP);

      if (response.data.success) {
        setIdentifyData(response?.data.payload);
      }
    } catch (error) {
      toast.error("Có lỗi khi lấy dữ liệu nhận diện");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 justify-between">
        <StatisticBlock
          icon={<ShieldCheck className="size-2" />}
          title="Số lượng hoàn thành"
          value={String(identifyData.length)}
          description="đã hoàn thành xác thực thông tin"
        />
      </div>
      <DataTable columns={columns} data={identifyData} colToSearch="name" searchPlaceholder="Tìm kiếm học sinh..." isLoading={isLoading} />
    </div>
  );
};

export default Identify;
