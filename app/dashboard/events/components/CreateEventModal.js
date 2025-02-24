"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/core/components/ui/dialog";
import { EventForm } from "./EventForm";
import { useEventMutation } from "@/app/hooks/useEventMutation";
import { useToast } from "@/app/core/hooks/use-toast";

export function CreateEventModal({ open, onOpenChange }) {
  const { toast } = useToast();
  const { mutate: createEvent, isLoading } = useEventMutation();

  const handleSubmit = async (data) => {
    createEvent(data, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Event created successfully",
        });
        onOpenChange(false);
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>
        <EventForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
