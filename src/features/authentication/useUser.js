import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export default function useUser() {
  const { isLoading, data } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  if( data ){
    const role = data.user?.role || data.role;
    const user = data.user || data;

    return {
      isLoading,
      user: user, 
      isAuthenticated: role === "authenticated",
      isAdmin: data.user_role !== 'user'
    }
  }

  return {
    isLoading,
    user: null,
    isAuthenticated: false,
    isAdmin: false,
  };
}
