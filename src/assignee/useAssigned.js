import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAssigned } from "../services/apiPhones";

export function useAssigned() {
  const { assignedId } = useParams();
  const {
    isPending,
    data: assigned,
    error,
  } = useQuery({
    queryKey: ["assigned", assignedId],
    queryFn: () => getAssigned(assignedId),
  });

  return { isPending, assigned, error };
}
