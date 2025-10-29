import z from "zod";

export const createProductSchema = z.object({
  user_id: z.number("User id harus berupa number"),
  name: z.string("Name harus berupa string").min(3, "Name minimal 3 karakter"),
  description: z
    .string("Description harus berupa string")
    .min(3, "Description minimal 3 karakter"),
  price: z.number("Price harus berupa number"),
  stock: z.number("Stock harus berupa number"),
});

export const updateProductSchema = createProductSchema.partial();
