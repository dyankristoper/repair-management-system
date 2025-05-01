import { useQuery } from "@tanstack/react-query";
import { getPendingRepairs } from "../services/apiPhones";

export function usePendingRepairs() {
  // const pending = completed === false;
  const { isPending, data: pendingRepairs } = useQuery({
    queryFn: getPendingRepairs,
    queryKey: ["pendingRepairs"],
  });

  return { isPending, pendingRepairs };
}
