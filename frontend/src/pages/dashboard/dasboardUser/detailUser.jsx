import { getUserById } from "@/utils/api/users";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { X } from "lucide-react";

export default function DetailUser({ id, setDetailUserPopup }) {
  const [user, setUser] = useState();

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
    <div
      className="fixed inset-0 bg-black/50 z-10 overflow-y-auto"
      onClick={() => setDetailUserPopup(false)}
    >
      <div className="min-h-full flex justify-center items-center p-4">
        <div
          className="w-full sm:w-150 bg-white rounded-2xl p-8 space-y-5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between">
            <p className="text-xl font-bold">Detail User</p>
            <button
              className="cursor-pointer"
              onClick={() => setDetailUserPopup(false)}
            >
              <X />
            </button>
          </div>
          <Table className="text-lg p-10">
            <TableBody>
              {rows.map(([label, value]) => (
                <TableRow key={label}>
                  <TableCell className="font-medium">{label}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
