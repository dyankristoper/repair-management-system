import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getTechnicians, getAssignedRepairs } from "../services/apiPhones";

export function useAssignee() {
  const [searchParams] = useSearchParams();
  const assigneeParam = searchParams.get("assignee");

  const filter =
    !assigneeParam || assigneeParam === "all"
      ? null
      : { field: "assignee", value: assigneeParam };

  // Query: Assigned Repairs
  const {
    data: assignedRepairs,
    isPending: isRepairsLoading,
    error: repairsError,
  } = useQuery({
    queryKey: ["assignedRepairs", filter],
    queryFn: () => getAssignedRepairs({ filter }),
  });

  // Query: Technicians
  const {
    data: technicians,
    isPending: isTechniciansLoading,
    error: techniciansError,
  } = useQuery({
    queryKey: ["technicians"],
    queryFn: getTechnicians,
  });

  return {
    assignedRepairs,
    technicians,
    isLoading: isRepairsLoading || isTechniciansLoading,
    error: repairsError || techniciansError,
  };
}

