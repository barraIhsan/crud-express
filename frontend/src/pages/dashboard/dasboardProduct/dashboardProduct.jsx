import DataTable from "@/components/dataTable";
import { columns } from "@/pages/dashboard/dasboardProduct/columsProduct";
import LayoutDashboard from "@/components/layout/layoutDashboard";
import { useState, useEffect } from "react";
import { getProducts } from "@/utils/api/products";

export default function DashboardProduct() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <LayoutDashboard>
      <DataTable columns={columns} data={products} />
    </LayoutDashboard>
  );
}
