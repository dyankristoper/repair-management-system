import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styled from "styled-components";
import { usePendingRepairs } from "../assignee/usePendingRepairs";
import { useDarkMode } from "../context/DarkModeContext";

const PieChartBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function PieChartComponent() {
  const { pendingRepairs } = usePendingRepairs();
  const { isDarkMode } = useDarkMode();

  const completedCount = (pendingRepairs ?? []).filter(
    (pending) => pending.completed
  ).length;

  const pendingCount = (pendingRepairs ?? []).filter(
    (pending) => !pending.completed
  ).length;

  const confirmationCount = (pendingRepairs ?? []).filter(
    (pending) => pending.waitingForConfirmation
  ).length;

  const startDataLight = [
    {
      duration: "completed",
      value: completedCount,
      color: "#445bef",
    },
    {
      duration: "pending",
      value: pendingCount,
      color: "#f97316",
    },
    {
      duration: "waiting for confirmation",
      value: confirmationCount,
      color: "#84cc16",
    },
  ];

  const startDataDark = [
    {
      duration: "completed",
      value: completedCount,
      color: "#3e53db",
    },
    {
      duration: "pending",
      value: pendingCount,
      color: "#c2410c",
    },
    {
      duration: "waiting for confirmation",
      value: confirmationCount,
      color: "#77b914",
    },
  ];

  const startData = isDarkMode ? startDataDark : startDataLight;

  return (
    <PieChartBox>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={startData}
            nameKey="duration"
            dataKey="value"
            innerRadius={65}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={5}
          >
            {startDataLight.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="28%"
            layout="vertical"
            iconSize={12}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </PieChartBox>
  );
}

export default PieChartComponent;
