import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { eventService } from "@/shared/services/events";

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => eventService.getAllEvents(),
  });
}

export function useEventMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data) => eventService.createEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
} 