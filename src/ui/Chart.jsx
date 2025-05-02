import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// import {
//   eachDayOfInterval,
//   format,
//   isDate,
//   isSameDay,
//   subDays,
// } from "date-fns";
import { useDarkMode } from "../context/DarkModeContext";

const fakeData = [
  { label: "Jan 09", totalSales: 480 },
  { label: "Jan 10", totalSales: 580 },
  { label: "Jan 11", totalSales: 550 },
  { label: "Jan 12", totalSales: 600 },
  { label: "Jan 13", totalSales: 700 },
  { label: "Jan 14", totalSales: 800 },
  { label: "Jan 15", totalSales: 700 },
  { label: "Jan 16", totalSales: 650 },
  { label: "Jan 17", totalSales: 600 },
  { label: "Jan 18", totalSales: 550 },
  { label: "Jan 19", totalSales: 700 },
  { label: "Jan 20", totalSales: 800 },
  { label: "Jan 21", totalSales: 700 },
  { label: "Jan 22", totalSales: 810 },
  { label: "Jan 23", totalSales: 950 },
  { label: "Jan 24", totalSales: 970 },
  { label: "Jan 25", totalSales: 900 },
  { label: "Jan 26", totalSales: 950 },
  { label: "Jan 27", totalSales: 850 },
  { label: "Jan 28", totalSales: 900 },
  { label: "Jan 29", totalSales: 800 },
  { label: "Jan 30", totalSales: 950 },
  { label: "Jan 31", totalSales: 1100 },
  { label: "Feb 01", totalSales: 1200 },
  { label: "Feb 02", totalSales: 1250 },
  { label: "Feb 03", totalSales: 1400 },
  { label: "Feb 04", totalSales: 1500 },
  { label: "Feb 05", totalSales: 1400 },
  { label: "Feb 06", totalSales: 1450 },
];

function Chart() {
  //   const allDates = eachDayOfInterval({
  //     start: subDays(new Date(), numDays - 1),
  //     end: new Date(),
  //   });

  const { isDarkMode } = useDarkMode();

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
        data={fakeData}
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
