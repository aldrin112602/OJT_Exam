import { useEffect } from "react";
import TopButtons from "./dashboard/TopButtons";
import ProductTable from "./dashboard/ProductTable";

const Dashboard: React.FC = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <>
      <TopButtons />
      <ProductTable />
    </>
  );
};

export default Dashboard;
