import ActionCell from "./actionCell";
export const columns = (onSuccess) => [
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
    accessorKey: "role",
    header: "Role",
  },
  {
    header: "Aksi",
    cell: ({ row }) => (
      <ActionCell id={row.original.id} onSuccess={onSuccess} />
    ),
  },
];
