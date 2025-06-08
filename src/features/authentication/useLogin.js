import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { jwtDecode } from 'jwt-decode';

export function useLogin() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) =>
      loginApi({
        email,
        password,
      }),
    onSuccess: (data) => {
      const { session } = data;
      const decoded = jwtDecode(session.access_token);

      queryClient.setQueryData(["user"], data.user);
      queryClient.setQueryData(["role"], decoded?.user_role);
      
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err.message);
      toast.error("Provided email and password are incorrect");
    },
  });

  return { login, isPending };
}
