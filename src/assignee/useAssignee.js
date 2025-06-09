import { useQuery } from "@tanstack/react-query";
import { getTechnicians } from "../services/apiPhones";
import { useSearchParams } from "react-router-dom";

export function useAssignee() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "assignee", value: filterValue };

  const { data: technicians, isPending } = useQuery({
    queryKey: ["technician", filter],
    queryFn: () =>
      getTechnicians(),
  });

  return { technicians, isPending };
}
