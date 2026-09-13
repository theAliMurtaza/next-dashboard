import { z } from "zod";

export const LeadSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  company: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name is too long"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.replace(/\D/g, "").length >= 7,
      "Phone number must have at least 7 digits"
    ),
  source: z.string().min(1, "Please select a lead source"),
  status: z.string().min(1, "Please select a status"),
  notes: z
    .string()
    .max(1000, "Notes must be under 1000 characters")
    .optional(),
  estimatedValue: z.number().min(0).optional(),
});

export type LeadInput = z.infer<typeof LeadSchema>;

/**
 * Validates raw lead input data.
 * Returns { isValid, errors } so action files can use it directly.
 */
export function validateLeadInput(data: unknown): {
  isValid: boolean;
  data?: LeadInput;
  errors?: Record<string, string>;
} {
  const result = LeadSchema.safeParse(data);

  if (result.success) {
    return { isValid: true, data: result.data };
  }

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0]?.toString() ?? "form";
    errors[key] = issue.message;
  }

  return { isValid: false, errors };
}