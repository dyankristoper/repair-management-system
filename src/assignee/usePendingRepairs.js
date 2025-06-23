import { useQuery } from "@tanstack/react-query";
import { getPendingRepairs } from "../services/apiPhones";

export function usePendingRepairs() {
  const { isPending, data: pendingRepairs } = useQuery({
    queryKey: ["job_orders"],
    queryFn: getPendingRepairs,
  });

  return { isPending, pendingRepairs };
}
