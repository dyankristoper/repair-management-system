import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styled from "styled-components";

const PieChartBox = styled.div`
  /* Box */
  /* background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  } */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const startDataLight = [
  {
    duration: "completed",
    value: 2,
    color: "#445bef",
  },
  {
    duration: "pending",
    value: 3,
    color: "#f97316",
  },
  {
    duration: "waiting for confirmation",
    value: 2,
    color: "#84cc16",
  },
];

function PieChartComponent() {
  return (
    <PieChartBox>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={startDataLight}
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
            width="35%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </PieChartBox>
  );
}

export default PieChartComponent;
