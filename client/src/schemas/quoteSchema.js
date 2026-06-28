import { z } from "zod";

export const quoteSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),

  email: z.string().email("Invalid email address"),

  phone: z.string().min(10, "Phone number is required"),

  business: z.string().min(2, "Business name is required"),

  details: z.string().min(10, "Please describe your project"),
});