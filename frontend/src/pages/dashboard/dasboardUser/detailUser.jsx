import { getUserById } from "@/utils/api/users";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LayoutDashboard from "@/components/layout/layoutDashboard";

export default function DetailUser() {
  const [user, setUser] = useState();
  const { id } = useParams();

  const fetchUserById = async (id) => {
    try {
      const response = await getUserById(id);
      console.log(response);
      setUser(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserById(id);
  }, [id]);

  const rows = [
    ["Nama Lengkap", user?.fullname],
    ["Username", user?.username],
    ["Email", user?.email],
    ["Alamat", user?.address],
    ["Nomor Telepon", user?.phone_number],
    ["Umur", user?.age],
    ["Role", user?.role],
  ];

  return (
    <LayoutDashboard>
      <p className="text-xl font-semibold mb-4 ml-2">Detail User #{id}</p>
      <Table className="w-fit text-lg">
        <TableBody>
          {rows.map(([label, value]) => (
            <TableRow key={label}>
              <TableCell className="font-medium w-60">{label}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </LayoutDashboard>
  );
}
