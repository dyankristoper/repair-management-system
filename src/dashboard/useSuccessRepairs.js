import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getSalesAfterDate } from "../services/apiPhones";
import { subDays } from "date-fns";

export function useSuccessRepairs() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isPending, data: phones } = useQuery({
    queryFn: () => getSalesAfterDate(queryDate),
    queryKey: ["phones", `last-${numDays}`],
  });

  return { isPending, phones, numDays };
}
