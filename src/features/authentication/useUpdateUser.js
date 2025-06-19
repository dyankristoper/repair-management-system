import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateCurrentUser, suspendAuthUser } from "../../services/apiAuth";
import { updateTechnician } from "../../services/apiPhones";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("User account successfully updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: suspendUser, isLoading: isSuspending } = useMutation({
    mutationFn: suspendAuthUser,
    onSuccess: () => {
      toast.success(`User has been deleted.`);
      queryClient.invalidateQueries({ queryKey: ["technicians"] })
    },
    onError: (error) => toast.error(error.message)
  });

  const { mutate: updateCurrentTechnician, isLoading: isTechnicianUpdating } = useMutation({
    mutationFn: updateTechnician,
    onSuccess: () => {
      toast.success(`Technician details has been updated.`);
      queryClient.invalidateQueries({ queryKey: ["technicians"] })
    },
    onError: (error) => toast.error(error.message)
  });

  return { updateUser, isUpdating, suspendUser, isSuspending, updateCurrentTechnician, isTechnicianUpdating };
}
