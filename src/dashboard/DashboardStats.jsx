import styled from "styled-components";
import { formatCurrency } from "../helpers/formatCurrency";
import Stat from "../ui/Stat";

const StyledDashboardStats = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2em;
  height: 15rem;
`;

function DashboardStats({ job_orders }) {
  const numPhones = (job_orders ?? []).length;
  const sales = (job_orders ?? [])
    .filter((job_order) => job_order.job_order_status === "success")
    .reduce((acc, cur) => acc + cur.cost, 0);

  return (
    <StyledDashboardStats>
      <Stat title="Phones" value={numPhones} />
      <Stat title="Sales" value={formatCurrency(sales)} />
    </StyledDashboardStats>
  );
}

export default DashboardStats;
