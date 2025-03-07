"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/app/core/components/ui/drawer";
import { EventForm } from "./EventForm";
import { useEventMutation } from "@/app/dashboard/events/hooks/useEvents";
import { useToast } from "@/app/core/hooks/use-toast";
import { X } from "lucide-react";
import { Button } from "@/app/core/components/ui/button";

export function CreateEventDrawer({ open, onOpenChange }) {
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
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerHeader className="flex items-center justify-between">
        <DrawerTitle>Create New Event</DrawerTitle>
        <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
          <X className="h-4 w-4" />
        </Button>
      </DrawerHeader>
      <DrawerContent>
        <EventForm onSubmit={handleSubmit} />
      </DrawerContent>
    </Drawer>
  );
}
