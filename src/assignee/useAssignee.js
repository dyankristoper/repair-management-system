import { useQuery } from "@tanstack/react-query";
import { getAssignedRepairs } from "../services/apiPhones";
import { useSearchParams } from "react-router-dom";

export function useAssignee() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "assignee", value: filterValue };

  const { data: technician, isPending } = useQuery({
    queryKey: ["technician", filter],
    queryFn: () =>
      getAssignedRepairs({
        filter,
      }),
  });

  return { technician, isPending };
}
