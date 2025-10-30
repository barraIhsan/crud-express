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
import Swal from "sweetalert2";

export default function ActionCell({ id, onSuccess }) {
  const navigate = useNavigate();
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      Swal.fire({
        title: "Sukses",
        text: "Sukses menghapus user",
        icon: "success",
      });
      onSuccess();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Gagal menghapus user: " + error,
      });
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
