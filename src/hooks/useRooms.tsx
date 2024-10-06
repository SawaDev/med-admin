import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { CreateRoom, GetAllRoomsResponse } from "@/types/Room.type";
import { api } from "@/lib/api";
import { Response } from "@/types/Other.type";

const useRooms = () => {
  const queryClient = useQueryClient();

  const createRoomMutation = () =>
    useMutation<Response, AxiosError, CreateRoom>({
      mutationFn: async (data) => {
        try {
          const response = await api.post(`/rooms`, data);

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
        queryClient.invalidateQueries({ queryKey: ["rooms"] });
      },
    });

  const getAllRoomsQuery = () =>
    useQuery<GetAllRoomsResponse, Error>({
      queryKey: ["rooms"],
      queryFn: async () => {
        try {
          const response = await api.get(`/rooms`);

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

  const updateRoomMutation = (id: number | undefined) =>
    useMutation<Response, AxiosError, CreateRoom>({
      mutationFn: async (data) => {
        try {
          const response = await api.put(`/rooms/${id}`, data);

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

  const deleteRoomMutation = (id: number | undefined) =>
    useMutation({
      mutationFn: async () => {
        try {
          const response = await api.delete(`/rooms/${id}`);
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
        queryClient.invalidateQueries({ queryKey: ["rooms"] });
      },
    });

  return {
    createRoomMutation,
    getAllRoomsQuery,
    updateRoomMutation,
    deleteRoomMutation,
  };
};

export default useRooms;
