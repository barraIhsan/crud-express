import z from "zod";

export const createUserSchema = z.object({
  fullname: z
    .string("Fullname harus berupa string")
    .min(3, "Fullname minimal 3 karakter"),
  username: z
    .string("Username harus berupa string")
    .min(3, "Username minimal 3 karakter")
    .regex(/^\S+$/, "Username tidak boleh mengandung spasi"),
  email: z.email("Email tidak valid"),
  password: z
    .string("Password harus berupa string")
    .min(6, "Password minimal 6 karakter"),
  role: z.enum(["admin", "user"], "Role harus 'admin' atau 'user'"),
  address: z
    .string("Address harus berupa string")
    .min(3, "Address minimal 3 karakter")
    .optional(),
  phone_number: z
    .string("Phone number harus berupa string")
    .min(3, "Phone number minimal 3 karakter")
    .optional(),
  age: z.number("Age harus berupa number").optional(),
});

export const updateUserSchema = createUserSchema.partial();
