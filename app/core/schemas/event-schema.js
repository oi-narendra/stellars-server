import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  short_description: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  long_description: z.string().optional(),
  image_url: z.string().optional(),
  meeting_link: z.string().url("Must be a valid URL").optional().nullable(),
  date_time: z.date({
    required_error: "Please select a date and time",
  }),
  location: z.object({
    name: z.string().min(3, "Location name is required"),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
  additional_data: z.record(z.any()).optional(),
});
