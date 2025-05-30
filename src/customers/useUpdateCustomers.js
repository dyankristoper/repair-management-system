import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCustomer } from "../services/apiCustomers";

export function useUpdateCustomers(mutationName, successMessage) {
  const queryClient = useQueryClient();

  let updateFunction;
  let mode = mutationName;

  if (mode === "edit") {
    updateFunction = createEditCustomer;
  }

  if (mode === "create") {
    updateFunction = createEditCustomer;
  }

  const { mutate, isLoading } = useMutation({
    mutationFn:
      mode === "edit"
        ? ({ newCustomerData, id }) => updateFunction(newCustomerData, id)
        : updateFunction,
    onSuccess: () => {
      toast.success(successMessage);
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, isLoading };
}
