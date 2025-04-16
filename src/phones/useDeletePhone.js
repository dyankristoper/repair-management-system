import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePhone as deletePhoneApi } from "../services/apiPhones";
import toast from "react-hot-toast";

export function useDeletePhone() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deletePhone } = useMutation({
    mutationFn: deletePhoneApi,
    onSuccess: () => {
      toast.success("Phone succesfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["phones"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deletePhone };
}
