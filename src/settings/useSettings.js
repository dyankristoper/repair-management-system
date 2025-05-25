import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    data: settings,
    error,
  } = useQuery({
    //uniquely indentify the data to query.needs to ba an array.
    queryFn: getSettings,
    queryKey: ["company_settings"],
  });

  return { isLoading, settings, error };
}
