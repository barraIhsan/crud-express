import { Trash2, Info, Pencil } from "lucide-react";
import { deleteUser } from "@/utils/api/users";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

export default function ActionCell({ id }) {
  const navigate = useNavigate();
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      alert("Data User Berhasil Dihapus");
      window.location.reload();
    } catch (error) {
      alert("Gagal Menghapus Data User" + error);
    }
  };

  return (
    <div>
      {/* Button Info */}
      <button onClick={() => navigate(`/dashboard/user/${id}`)}>
        <Info size={20} className="cursor-pointer" />
      </button>
      {/* Button Edit */}
      <button onClick={() => console.log("Ini Button Edit")}>
        <Pencil size={20} />
      </button>
      {/* Button Delete */}
      <AlertDialog>
        <AlertDialogTrigger>
          <Trash2 size={20} className="cursor-pointer" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah Anda yakin menghapus data
            </AlertDialogTitle>
            <AlertDialogDescription>
              Data yang sudah dihapus tidak dapat dikembalikan lagi
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeleteUser(id)}>
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
