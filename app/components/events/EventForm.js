"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "@/app/lib/schemas/eventSchema";
import { Form, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function EventForm({ onSubmit, initialData }) {
  const form = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: initialData || {
      title: "",
      short_description: "",
      long_description: "",
      date_time: new Date(),
      location: {
        name: "",
        latitude: 0,
        longitude: 0,
      },
    },
  });

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <FormField>
        <FormLabel error={form.formState.errors.title?.message}>
          Title
        </FormLabel>
        <Input {...form.register("title")} />
        <FormMessage>{form.formState.errors.title?.message}</FormMessage>
      </FormField>

      <FormField>
        <FormLabel error={form.formState.errors.short_description?.message}>
          Short Description
        </FormLabel>
        <Textarea {...form.register("short_description")} />
        <FormMessage>
          {form.formState.errors.short_description?.message}
        </FormMessage>
      </FormField>

      <FormField>
        <FormLabel>Long Description</FormLabel>
        <Textarea {...form.register("long_description")} />
      </FormField>

      <FormField>
        <FormLabel error={form.formState.errors.date_time?.message}>
          Date and Time
        </FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !form.watch("date_time") && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {form.watch("date_time") ? (
                format(form.watch("date_time"), "PPP 'at' p")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={form.watch("date_time")}
              onSelect={(date) => form.setValue("date_time", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <FormMessage>{form.formState.errors.date_time?.message}</FormMessage>
      </FormField>

      <FormField>
        <FormLabel error={form.formState.errors.location?.name?.message}>
          Location Name
        </FormLabel>
        <Input {...form.register("location.name")} />
        <FormMessage>
          {form.formState.errors.location?.name?.message}
        </FormMessage>
      </FormField>

      <FormField>
        <FormLabel>Location Latitude </FormLabel>
        <Input {...form.register("location.latitude")} />
      </FormField>

      <FormField>
        <FormLabel>Location Longitude</FormLabel>
        <Input {...form.register("location.longitude")} />
      </FormField>

      <FormField>
        <FormLabel>Meeting Link (for virtual events)</FormLabel>
        <Input {...form.register("meeting_link")} type="url" />
        <FormMessage>{form.formState.errors.meeting_link?.message}</FormMessage>
      </FormField>

      <Button type="submit" className="w-full">
        Create Event
      </Button>
    </Form>
  );
}
