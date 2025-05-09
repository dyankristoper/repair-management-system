import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useDarkMode } from "../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

function Chart({ phones, numDays }) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MM dd"),
      totalSales: (phones ?? [])
        .filter((phone) => isSameDay(date, new Date(phone.created_at)))
        .filter((phone) => phone.success === true)
        .reduce((acc, cur) => acc + cur.cost, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#5CB338", fill: "#ECE852" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#5CB338", fill: "#A7D477" },
        text: "#374151",
        background: "#fff",
      };
  return (
    <ResponsiveContainer width="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="4" />

        <XAxis dataKey="label" />
        <YAxis
          unit="php"
          tick={{ fill: colors.text }}
          tickLine={{ stroke: colors.text }}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="totalSales"
          stroke={colors.totalSales.stroke}
          fill={colors.totalSales.fill}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default Chart;
