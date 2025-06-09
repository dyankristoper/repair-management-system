import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../services/apiCustomers";

export function useCustomers() {
  const { data: customers, isLoading } = useQuery({
    queryFn: getCustomers,
    queryKey: ["customers"],
  });

  return { customers, isLoading };
}
