import DataTable from "@/components/dataTable";
import { columns } from "@/pages/dashboard/dasboardUser/columsUser";
import LayoutDashboard from "@/components/layout/layoutDashboard";
import { getUsers } from "@/utils/api/users";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import AddUser from "./addUser";

export default function DashboardUser() {
  const [users, setUsers] = useState([]);
  const [addUserPopup, setAddUserPopup] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <LayoutDashboard>
      {addUserPopup && (
        <AddUser setAddUserPopup={setAddUserPopup} onSuccess={fetchUsers} />
      )}
      <Button
        onClick={() => setAddUserPopup(true)}
        className="cursor-pointer mb-4"
      >
        Add User
      </Button>
      <DataTable columns={columns(fetchUsers)} data={users} />
    </LayoutDashboard>
  );
}
