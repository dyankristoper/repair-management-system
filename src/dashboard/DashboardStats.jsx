import { formatCurrency } from "../helpers/formatCurrency";
import Stat from "../ui/Stat";

function DashboardStats({ phones }) {
  const numPhones = (phones ?? []).length;
  const sales = (phones ?? [])
    .filter((phone) => phone.success === true)
    .reduce((acc, cur) => acc + cur.cost, 0);

  return (
    <>
      <Stat title="Phones" value={numPhones} />
      <Stat title="Sales" value={formatCurrency(sales)} />
    </>
  );
}

export default DashboardStats;
