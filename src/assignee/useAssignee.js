import { useQuery } from "@tanstack/react-query";
import { getAssignedRepairs } from "../services/apiPhones";

export function useAssignee() {
  const { data: technician, isPending } = useQuery({
    queryFn: getAssignedRepairs,
    queryKey: ["technician"],
  });

  return { technician, isPending };
}
