import { useEffect } from "react";

const Dashboard: React.FC = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
