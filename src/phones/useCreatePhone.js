import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditPhone } from "../services/apiPhones";

export function useCreatePhone() {
  const queryClient = useQueryClient();

  const { mutate: createPhone, isLoading: isCreating } = useMutation({
    mutationFn: createEditPhone,
    onSuccess: () => {
      toast.success("New phone succesfully created");
      queryClient.invalidateQueries({
        queryKey: ["phones"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createPhone, isCreating };
}
