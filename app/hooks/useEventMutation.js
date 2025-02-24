import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { eventService } from "@/app/services/eventService";

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
      // Invalidate and refetch events
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
