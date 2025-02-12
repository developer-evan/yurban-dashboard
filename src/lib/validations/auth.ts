import * as z from "zod"

export const loginSchema = z.object({
  phoneNumber: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(13, "Phone number must not exceed 13 digits")
    .regex(/^\+?[1-9]\d{9,12}$/, "Invalid phone number format"),
  pin: z.string().length(4, "PIN must be exactly 4 digits")
})

export type LoginSchema = z.infer<typeof loginSchema>