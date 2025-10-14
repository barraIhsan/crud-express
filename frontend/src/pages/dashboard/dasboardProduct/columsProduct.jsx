import { Trash2, Info, Pencil } from "lucide-react";
import { deleteProduct } from "@/utils/api/products";
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

export const columns = [
  {
    header: "No",
    accessorFn: (_, index) => index + 1,
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "description",
    header: "Deskripsi",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    header: "Aksi",
    cell: ({ row }) => {
      const id = row.original.id;

      // handler delete product

      const handleDeleteProduct = async (id) => {
        try {
          await deleteProduct(id);
          alert("Data Product Berhasil Dihapus");
          window.location.reload();
        } catch (error) {
          alert("Gagal Menghapus Data Product" + error);
        }
      };

      return (
        <div>
          {/* Button Info */}
          <button onClick={() => console.log("Ini Button Info`")}>
            <Info size={20} />
          </button>
          {/* Button Edit */}
          <button onClick={() => console.log("Ini Button Edit")}>
            <Pencil size={20} />
          </button>
          {/* Button Delete */}
          <AlertDialog>
            <AlertDialogTrigger>
              <Trash2 size={20} />
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
                <AlertDialogAction onClick={() => handleDeleteProduct(id)}>
                  Yes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
