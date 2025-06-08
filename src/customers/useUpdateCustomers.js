import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCustomer } from "../services/apiCustomers";

export function useUpdateCustomers(mode, successMessage) {
  const queryClient = useQueryClient();

  const mutationFn =
    mode === "edit"
      ? ({ newCustomerData, id }) => createEditCustomer(newCustomerData, id)
      : createEditCustomer;

  const { mutate, isLoading } = useMutation({
    mutationFn,
    onSuccess: (updatedCustomer, variables) => {
      toast.success(successMessage);

      if (mode === "edit") {
        queryClient.invalidateQueries(["customers"], (oldData) => {
          if (!oldData?.data) return oldData;

          return {
            ...oldData,
            data: oldData.data.map((customer) =>
              customer.id === variables.id ? updatedCustomer : customer
            ),
          };
        });
      }
    },

    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}
