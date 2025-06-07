import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditSettings, deleteSettings } from "../services/apiSettings";

export function useUpdateSettings(mutationName, successMessage) {
  const queryClient = useQueryClient();

  let updateFunction;
  let mode = mutationName;

  if (mode === "edit") {
    updateFunction = createEditSettings;
  }

  if (mode === "delete") {
    updateFunction = deleteSettings;
  }

  if (mode === "create") {
    updateFunction = createEditSettings;
  }

  const { mutate, isLoading } = useMutation({
    mutationFn:
      mode === "edit"
        ? ({ newSettingsData, id }) => updateFunction(newSettingsData, id)
        : updateFunction,
    onSuccess: () => {
      toast.success(successMessage);
      queryClient.invalidateQueries({
        queryKey: ["company_settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, isLoading };
}
