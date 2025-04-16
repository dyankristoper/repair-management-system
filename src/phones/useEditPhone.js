import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditPhone } from "../services/apiPhones";
import toast from "react-hot-toast";

export function useEditPhone() {
  const queryClient = useQueryClient();

  const { mutate: editPhone, isLoading: isEditing } = useMutation({
    mutationFn: ({ newPhoneData, id }) => createEditPhone(newPhoneData, id),
    onSuccess: () => {
      toast.success("New phone succesfully edited");

      queryClient.invalidateQueries({
        queryKey: ["phones"],
      });
      //   reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { editPhone, isEditing };
}
