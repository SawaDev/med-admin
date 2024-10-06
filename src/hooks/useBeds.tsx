import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import {
  CreateBed,
  CreateBookingType,
  GetRoomBedsReponse,
} from "@/types/Bed.type";
import { api } from "@/lib/api";
import { Response } from "@/types/Other.type";

const useBeds = () => {
  const queryClient = useQueryClient();

  const createBedMutation = () =>
    useMutation<Response, AxiosError, CreateBed>({
      mutationFn: async (data) => {
        try {
          const response = await api.post(`/hospital-beds`, data);

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

  const createBedBookingMutation = (id?: string) =>
    useMutation<Response, AxiosError, CreateBookingType>({
      mutationFn: async (data) => {
        try {
          if (!id) return;

          const response = await api.post(
            `/hospital-beds/${id}/bookings`,
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

  const getRoomBedsQuery = (id?: number) =>
    useQuery<GetRoomBedsReponse, Error>({
      queryKey: ["beds", id],
      queryFn: async () => {
        if (!id) return;
        try {
          const response = await api.get(`/hospital-beds?roomId=${id}`);
          return structuredClone(response.data);
        } catch (error: any) {
          toast({
            variant: "destructive",
            title: "Error!",
            description: error?.response?.data?.message,
          });
        }
      },
      staleTime: 0,
      enabled: !!id,
    });

  const updateBedMutation = (id: number | undefined) =>
    useMutation<Response, AxiosError, CreateBed>({
      mutationFn: async (data) => {
        try {
          const response = await api.put(`/hospital-beds/${id}`, data);

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

  const deleteBedMutation = (id: number | undefined) =>
    useMutation({
      mutationFn: async () => {
        try {
          const response = await api.delete(`/hospital-beds/${id}`);
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
        queryClient.invalidateQueries({ queryKey: ["beds"] });
      },
    });

  const deleteBedBookingMutation = (id: number | undefined) =>
    useMutation({
      mutationFn: async () => {
        try {
          const response = await api.delete(`/hospital-beds/${id}/bookings`);
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
        queryClient.invalidateQueries({ queryKey: ["beds", id] });
      },
    });

  return {
    createBedMutation,
    createBedBookingMutation,
    getRoomBedsQuery,
    updateBedMutation,
    deleteBedMutation,
    deleteBedBookingMutation,
  };
};

export default useBeds;
