"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "@/lib/validations/event";
import { Form, FormField, FormLabel, FormMessage } from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

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
      <div className="space-y-6 px-6 py-4">
        <FormField>
          <FormLabel error={form.formState.errors.title?.message}>
            Title
          </FormLabel>
          <Input {...form.register("title")} />
          <FormMessage>{form.formState.errors.title?.message}</FormMessage>
        </FormField>

        {/* ... other form fields ... */}
      </div>

      <div className="px-6 py-4 border-t bg-white mt-auto">
        <Button 
          type="submit" 
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Creating..." : "Create Event"}
        </Button>
      </div>
    </Form>
  );
} 