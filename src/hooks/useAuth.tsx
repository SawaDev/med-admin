import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import axios, { AxiosError } from "axios";
import {
  AuthResponse,
  AuthType,
  GetUserDetailsResponse,
} from "@/types/Auth.type";
import { api } from "@/lib/api";
import useAuthStore from "@/store/auth";

const useAuth = () => {
  const { clearAuth } = useAuthStore();

  const authMutation = () =>
    useMutation<AuthResponse, AxiosError, AuthType>({
      mutationFn: async (data) => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/users/sign-in`,
            data
          );

          return response.data;
        } catch (error: any) {
          toast({
            variant: "destructive",
            title: "Error!",
            description: error?.response?.data?.message,
          });
          return null;
        }
      },
    });

  const getUserDetailsQuery = (enabled: boolean) =>
    useQuery<GetUserDetailsResponse, Error>({
      queryKey: ["me"],
      queryFn: async () => {
        try {
          const response = await api.get(`/users/details`);

          return structuredClone(response.data);
        } catch (error: any) {
          if (error?.response?.status === 401) {
            return clearAuth()
          }

          toast({
            variant: "destructive",
            title: "Error!",
            description: error?.response?.data?.message,
          });
        }
      },
      enabled,
    });

  return {
    authMutation,
    getUserDetailsQuery,
  };
};

export default useAuth;
