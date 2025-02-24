import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { eventsService } from "@/app/dashboard/events/services/eventsService";

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => eventsService.getAllEvents(),
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
