import ActionCell from "./actionCell";
export const columns = [
  {
    header: "No",
    accessorFn: (_, index) => index + 1,
  },
  {
    accessorKey: "fullname",
    header: "Nama Lengkap",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone_number",
    header: "Nomor Telepon",
  },
  {
    accessorKey: "age",
    header: "Umur",
  },
  {
    accessorKey: "address",
    header: "Alamat",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    header: "Aksi",
    cell: ({ row }) => <ActionCell id={row.original.id} />,
  },
];
