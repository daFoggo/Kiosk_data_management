import { IEventData, IFormData } from "@/models/event";
import { GET_EVENT_DATA_IP, UPDATE_EVENT_DATA_IP } from "@/utils/ip";
import axios from "axios";
import { toZonedTime } from "date-fns-tz";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const timeZone = "Asia/Ho_Chi_Minh";

const Event = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [eventData, setEventData] = useState<IEventData[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm<IFormData>({
    defaultValues: {
      name: "",
      start_time: toZonedTime(new Date(), timeZone),
      end_time: toZonedTime(new Date(), timeZone),
      location: "",
    },
  });
  
  useEffect(() => {
    handleGetEventData();
  }, [])

  const handleGetEventData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(GET_EVENT_DATA_IP);

      if (response.data.success) {
        setEventData(response?.data.payload);
      }
    } catch (error) {
      toast.error("Có lỗi khi lấy dữ liệu sự kiện");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }


  // const handleUpdateEvent = async () => {
  //   setIsUpdating(true);
  //   try {
  //     const response = await axios.put(UPDATE_EVENT_DATA_IP, form.getValues());
  //   } catch (error) {
  //     toast.error("Có lỗi khi cập nhật sự kiện");
  //     console.log(error);
  //   }
  // }
  

  
  return <div>Event</div>;

};

export default Event;
