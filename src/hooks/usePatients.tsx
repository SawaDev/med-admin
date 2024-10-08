import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import {
  CreatePatient,
  CreatePatientResponse,
  GetAllPatientsResponse,
} from "@/types/Patient.type";
import { api } from "@/lib/api";
import { ListType } from "@/types/Other.type";

const usePatients = () => {
  const queryClient = useQueryClient();

  const createPatientMutation = () =>
    useMutation<CreatePatientResponse, AxiosError, CreatePatient>({
      mutationFn: async (data) => {
        try {
          const response = await api.post(
            `/patients`,
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
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["patients"] });
      },

    });

  const updatePatientMutation = (id: number | undefined) =>
    useMutation<CreatePatientResponse, AxiosError, CreatePatient>({
      mutationFn: async (data) => {
        try {
          const response = await api.put(
            `/patients/${id}`,
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
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["patients"] });
      },
    });

  const getAllPatientsQuery = (data: ListType) =>
    useQuery<GetAllPatientsResponse, Error>({
      queryKey: ["patients", data.size, data.page, data.search],
      queryFn: async () => {
        try {
          const response = await api.post(`/patients/list`, data);

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

  const deletePatientMutation = (id: number | undefined) =>
    useMutation({
      mutationFn: async () => {
        try {
          const response = await api.delete(`/patients/${id}`);
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
        queryClient.invalidateQueries({ queryKey: ["patients"] });
      },
    });

  return {
    createPatientMutation,
    getAllPatientsQuery,
    updatePatientMutation,
    deletePatientMutation,
  };
};

export default usePatients;
