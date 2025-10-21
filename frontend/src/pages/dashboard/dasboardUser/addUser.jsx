import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormItem } from "@/components/ui/form";
import { FormLabel } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormMessage } from "@/components/ui/form";
import { addUser } from "@/utils/api/users";
import { X } from "lucide-react";

const addUserSchema = z.object({
  fullname: z
    .string()
    .min(2, { message: "Nama Lengkap harus minimal 2 karakter" }),
  username: z.string().min(2, { message: "Username harus minimal 2 karakter" }),
  password: z.string().min(2, { message: "Password harus minimal 2 karakter" }),
  email: z.email({ message: "Format email tidak valid" }),
  phone_number: z
    .string()
    .refine((val) => !isNaN(val), "Nomor telepon harus berupa angka")
    .transform((val) => Number(val)),
  age: z
    .string()
    .refine((val) => !isNaN(val), "Umur harus berupa angka")
    .transform((val) => Number(val)),
  address: z.string().min(2, { message: "Alamat harus minimal 2 karakter" }),
  role: z.enum(["user", "admin"]),
});

export default function AddUser({ setAddUserPopup }) {
  const form = useForm({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      fullname: "",
      username: "",
      password: "",
      email: "",
      phone_number: "",
      age: "",
      address: "",
      role: "user",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    try {
      addUser(data);
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-10 overflow-y-auto"
      onClick={() => setAddUserPopup(false)}
    >
      <div className="min-h-full flex justify-center items-center p-4">
        <div
          className="w-full sm:w-250 bg-white rounded-2xl p-8 space-y-5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between">
            <p className="text-xl font-bold">Add User</p>
            <button
              className="cursor-pointer"
              onClick={() => setAddUserPopup(false)}
            >
              <X />
            </button>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Nama lengkap */}
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel data-error="false">Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan Nama Lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel data-error="false">Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel data-error="false">Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel data-error="false">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nomor telepon */}
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel data-error="false">Nomor Telepon</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan Nomor Telepon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Umur */}
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel data-error="false">Umur</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan Umur" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Alamat */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel data-error="false">Alamat</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan Alamat" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
