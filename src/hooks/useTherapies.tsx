import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { api } from "@/lib/api";
import { Response } from "@/types/Other.type";
import {
  CreateTherapyDataType,
  GetTherapiesData,
  GetTherapiesResponse,
  GetTherapyStatisticsData,
  GetTherapyStatisticsResponse,
} from "@/types/Therapy.type";

const useTherapies = () => {
  const queryClient = useQueryClient();

  const createTherapyMutation = () =>
    useMutation<Response, AxiosError, CreateTherapyDataType>({
      mutationFn: async (data) => {
        try {
          const response = await api.post(`/therapies`, data);

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

  const getTherapiesQuery = (data: GetTherapiesData) =>
    useQuery<GetTherapiesResponse, Error>({
      queryKey: ["therapies", data.bedside_treatment, data.size, data.page, data.from_date, data.to_date, data.search],
      queryFn: async () => {
        try {
          const response = await api.post(`/therapies/list`, data);

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

  const getTherapyStatisticsQuery = (data: GetTherapyStatisticsData) =>
    useQuery<GetTherapyStatisticsResponse, Error>({
      queryKey: ["therapies", "statistics", data.from_date_time, data.to_date_time],
      queryFn: async () => {
        try {
          const response = await api.post(`/therapies/statistics`, data);

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

  const updateTherapyTypeMutation = (id: number | undefined) =>
    useMutation<Response, AxiosError, CreateTherapyDataType>({
      mutationFn: async (data) => {
        try {
          const response = await api.put(`/therapies/${id}`, data);

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

  const deleteTherapyMutation = (id: number | undefined) =>
    useMutation({
      mutationFn: async () => {
        try {
          const response = await api.delete(`/therapies/${id}`);
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
        queryClient.invalidateQueries({ queryKey: ["therapies"] });
      },
    });

  return {
    createTherapyMutation,
    getTherapiesQuery,
    getTherapyStatisticsQuery,
    updateTherapyTypeMutation,
    deleteTherapyMutation,
  };
};

export default useTherapies;
