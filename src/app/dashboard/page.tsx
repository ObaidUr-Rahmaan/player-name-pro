import React from "react";
import { UserButton } from "@clerk/nextjs";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Dashboard;
