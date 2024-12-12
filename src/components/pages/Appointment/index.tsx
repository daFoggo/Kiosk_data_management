import StatisticBlock from "@/components/StatisticBlock";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  IAppointmentData,
  IDepartmentStat,
  IMonthStat,
} from "@/models/appointment";
import {
  CalendarCheck2,
  CalendarDays,
  Flame,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { CHART_CONFIG } from "./constant";
import axios from "axios";
import {
  GET_APPOINTMENT_STATISTIC_ALL_TIME,
  GET_APPOINTMENT_STATISTIC_BY_DEPARTMENTS,
  GET_APPOINTMENT_STATISTIC_BY_MONTH,
  GET_APPOINTMENT_STATISTIC_BY_YEAR,
} from "@/utils/ip";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Separator } from "@/components/ui/separator";

const Appointment = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [appointmentData, setAppointmentData] = useState<IAppointmentData[]>(
    []
  );
  const [yearStat, setYearStat] = useState<IMonthStat[]>([]);
  const [monthStat, setMonthStat] = useState<number>();
  const [departmentStat, setDepartmentStat] = useState<IDepartmentStat[]>([]);

  useEffect(() => {
    handleGetAllData();
  }, []);

  const handleGetAllData = async () => {
    setIsLoading(true);
    try {
      const [allData, yearData, monthData, departmentData] = await Promise.all([
        (await axios.get(GET_APPOINTMENT_STATISTIC_ALL_TIME)).data,
        (await axios.get(GET_APPOINTMENT_STATISTIC_BY_YEAR)).data,
        (await axios.get(GET_APPOINTMENT_STATISTIC_BY_MONTH)).data,
        (await axios.get(GET_APPOINTMENT_STATISTIC_BY_DEPARTMENTS)).data,
      ]);

      if (
        allData.success &&
        yearData.success &&
        monthData.success &&
        departmentData.success
      ) {
        setAppointmentData(allData.payload);
        setYearStat(yearData.payload);
        setMonthStat(monthData.payload);
        setDepartmentStat(departmentData.payload);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi lấy dữ liệu");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const recentlyAppointment = useMemo(() => {
    return appointmentData?.slice(0, 7);
  }, [appointmentData]);

  const chartStats = useMemo(() => {
    const totals = yearStat?.map((item) => item.so_luong);
    const maxIndex = totals.indexOf(Math.max(...totals));
    const minIndex = totals.indexOf(Math.min(...totals));

    const currentMonthIndex = totals.length - 1;
    const previousMonthIndex = currentMonthIndex - 1;

    const currentMonthTotal = totals[currentMonthIndex];
    const previousMonthTotal = totals[previousMonthIndex];

    const description = {
      type: currentMonthTotal > previousMonthTotal ? "up" : "down",
      percent: Math.abs(
        Math.round(
          ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100
        )
      ),
    };

    return {
      max: {
        value: Math.max(...totals),
        month: `Th${yearStat[maxIndex]?.thang}`,
      },
      min: {
        value: Math.min(...totals),
        month: `Th${yearStat[minIndex]?.thang}`,
      },
      average: Math.round(totals.reduce((a, b) => a + b, 0) / totals.length),
      description,
    };
  }, [yearStat]);

  const famousDepartment = useMemo(() => {
    const totals = departmentStat?.map((item) => item.appointments);
    const maxIndex = totals.indexOf(Math.max(...totals));
    return departmentStat[maxIndex]?.department_name;
  }, [departmentStat]);

  if (isLoading) return <div>Đang tải...</div>;

  return (
    <div className="flex flex-col gap-4 min-h-screen">
      <div className="w-full grid grid-cols-3 gap-4">
        {/*Overall statistics */}
        <StatisticBlock
          icon={<CalendarCheck2 className="size-4" />}
          title="Tổng số"
          value={String(appointmentData?.length)}
          description="lịch hẹn đã được đặt kể từ trước đến giờ"
        />
        <StatisticBlock
          icon={<CalendarDays className="size-4" />}
          title="Lịch hẹn trong tháng này"
          value={String(monthStat)}
          description="lịch hẹn đã được đặt trong tháng này"
        />
        <StatisticBlock
          icon={<Flame className="size-4" />}
          title="Phòng ban được đặt nhiều nhất"
          value={famousDepartment}
          description="được đặt lịch hẹn nhiều nhất"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {/*Year statistics */}
        <Card className="col-span-2 p-4">
          <CardHeader className="p-0">
            <CardTitle>Thống kê trong năm</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer
              config={CHART_CONFIG}
              className="max-h-[300px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={yearStat}
                margin={{
                  top: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={15}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  textAnchor="middle"
                  height={60}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="total" fill="#6467f2" radius={3}>
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm p-0">
            <div className="flex justify-center gap-4 text-sm text-muted-foreground w-full">
              <span>
                Cao nhất:{" "}
                <b>{`${chartStats.max.month} - ${chartStats.max.value}`}</b>
              </span>
              <span>
                Trung bình: <b>{chartStats.average}</b>
              </span>
              <span>
                Thấp nhất:{" "}
                <b>{`${chartStats.min.month} - ${chartStats.min.value}`}</b>
              </span>
            </div>
            <div className="flex gap-2 font-medium leading-none">
              {chartStats?.description?.type === "up" ? (
                <span>
                  Tăng
                  <b className="text-primary">
                    {` ${chartStats?.description?.percent}% `}
                  </b>
                  so với tháng trước
                </span>
              ) : (
                <span>
                  Giảm
                  <b>{` ${chartStats?.description?.percent}% `}</b>
                  so với tháng trước
                </span>
              )}
              {chartStats?.description?.type === "up" ? (
                <TrendingUp className="size-4 text-success" />
              ) : (
                <TrendingDown className="size-4 text-error" />
              )}
            </div>
          </CardFooter>
        </Card>

        {/*Recent apppointment */}
        <Card className="col-span-1 p-4">
          <CardHeader className="p-0">
            <CardTitle>Lịch hẹn gần đây</CardTitle>
            <CardDescription>Trong tuần này</CardDescription>
          </CardHeader>
          <CardContent className="p-0 mt-4 space-y-4">
            <ScrollArea className="h-[300px]">
              {recentlyAppointment.map((appointment, index) => (
                <div key={index} className="">
                  <div className="font-semibold">
                    {appointment.participants.find((p) => p.create)?.name}
                  </div>
                  <div className="text-muted-foreground text-sm line-clamp-1">
                    Người được hẹn:{" "}
                    {appointment.participants
                      .filter((p) => !p.create)
                      .map((p) => p.name)
                      .join(", ")}
                  </div>
                  {index === recentlyAppointment.length - 1 ? null : (
                    <Separator className="my-2" />
                  )}
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <DataTable
        columns={columns}
        data={appointmentData}
        colToSearch="purpose"
        searchPlaceholder="Tìm kiếm lịch hẹn..."
      />
    </div>
  );
};

export default Appointment;
