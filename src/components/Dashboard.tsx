import { useEffect, useState } from "react";
import TopButtons from "./dashboard/TopButtons";
import ProductTable from "./dashboard/ProductTable";

const Dashboard: React.FC = () => {
  
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <>
      
      <ProductTable />
    </>
  );
};

export default Dashboard;
