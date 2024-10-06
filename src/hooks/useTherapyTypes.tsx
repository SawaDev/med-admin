import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { api } from "@/lib/api";
import { Response } from "@/types/Other.type";
import {
  CreateTherapyType,
  GetAllTherapyTypesResponse,
} from "@/types/TherapyType.type";

const useTherapyTypes = () => {
  const queryClient = useQueryClient();

  const createTherapyTypeMutation = () =>
    useMutation<Response, AxiosError, CreateTherapyType>({
      mutationFn: async (data) => {
        try {
          const response = await api.post(`/therapy-types`, data);

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
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["therapy-types"] });
      },
    });

  const updateTherapyTypeMutation = (id: number | undefined) =>
    useMutation<Response, AxiosError, CreateTherapyType>({
      mutationFn: async (data) => {
        try {
          if(!id) return;
          
          const response = await api.put(`/therapy-types/${id}`, data);

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

  const getAllTherapyTypesQuery = () =>
    useQuery<GetAllTherapyTypesResponse, Error>({
      queryKey: ["therapy-types"],
      queryFn: async () => {
        try {
          const response = await api.get(`/therapy-types`);

          return structuredClone(response.data);
        } catch (error: any) {
          toast({
            variant: "destructive",
            title: "Error!",
            description: error?.response?.data?.message,
          });
        }
      },
    });

  const deleteTherapyTypeMutation = (id: number | undefined) =>
    useMutation({
      mutationFn: async () => {
        try {
          const response = await api.delete(`/therapy-types/${id}`);
          if (response?.data) {
            toast({
              description: "Muvaffaqiyatli o'chirildi!",
            });
          }
          return response.data;
        } catch (error: any) {
          toast({
            variant: "destructive",
            title: "Error!",
            description: error?.response?.data?.message,
          });
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["therapy-types"] });
      },
    });

  return {
    createTherapyTypeMutation,
    getAllTherapyTypesQuery,
    updateTherapyTypeMutation,
    deleteTherapyTypeMutation,
  };
};

export default useTherapyTypes;
