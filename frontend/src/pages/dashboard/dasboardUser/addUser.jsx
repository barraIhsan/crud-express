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
import Swal from "sweetalert2";

const addUserSchema = z.object({
  fullname: z
    .string()
    .min(2, { message: "Nama Lengkap harus minimal 2 karakter" }),
  username: z.string().min(2, { message: "Username harus minimal 2 karakter" }),
  password: z.string().min(6, { message: "Password harus minimal 6 karakter" }),
  email: z.email({ message: "Format email tidak valid" }),
  phone_number: z.string().optional(),
  age: z
    .string()
    .refine((val) => !isNaN(val), "Umur harus berupa angka")
    .transform((val) => Number(val))
    .optional(),
  address: z.string().optional(),
  role: z.enum(["user", "admin"]),
});

export default function AddUser({ setAddUserPopup, onSuccess }) {
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
    try {
      addUser(data);
      Swal.fire({
        title: "Sukses",
        text: "Sukses menambahkan user",
        icon: "success",
      });
      onSuccess();
      setAddUserPopup(false);
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Gagal menambahkan user: ",
        err,
        icon: "error",
      });
    }
  };

  const forms = [
    ["Nama Lengkap", "fullname"],
    ["Username", "username"],
    ["Password", "password"],
    ["Email", "email"],
    ["Nomor Telepon", "phone_number"],
    ["Umur", "age"],
    ["Alamat", "address"],
  ];

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
              {forms.map(([label, value]) => (
                <FormField
                  control={form.control}
                  name={value}
                  key={label}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel data-error="false">{label}</FormLabel>
                      <FormControl>
                        <Input placeholder={`Masukkan ${label}`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="submit" className="cursor-pointer">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
